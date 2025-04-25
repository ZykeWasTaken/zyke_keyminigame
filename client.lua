local _promise = nil

RegisterNUICallback("Eventhandler", function(passed, cb)
    local event <const> = passed.event
    local data <const> = passed.data

	if (event == "GetStrings") then
		return cb(Translations)
	elseif (event == "Complete") then
		if (_promise) then
			_promise:resolve(data.state)
		end

		cb("ok")
	elseif (event == "SetFocus") then
		SetNuiFocusKeepInput(data)
		SetNuiFocus(data, data)
		cb("ok")
	end
end)

---@param keys string[]
---@param randomizeKeys? integer @If a number, the `keys` param is sample size for randomization, and this is the amount
---@param timeLimit? integer @In seconds, time to complete the minigame otherwise you fail
---@return boolean, "success" | "fail" | "cancel"
function Start(keys, randomizeKeys, timeLimit)
	if (_promise) then error("Minigame already started") return false, "cancel" end

	if (type(randomizeKeys) == "number") then
		local tempKeys = {}

		for i = 1, randomizeKeys do
			local index = math.random(1, #keys)
			tempKeys[i] = keys[index]
		end

		keys = tempKeys
	end

	SendNUIMessage({
		event = "Start",
		data = {keys = keys, timeLimit = timeLimit or 10}
	})

	_promise = promise.new()
	local state = Citizen.Await(_promise)
	SetNuiFocus(false, false)

	_promise = nil

	return state == "success", state
end

exports("Start", Start)

function Stop()
	if (not _promise) then return end

	_promise:resolve("cancel")
	SendNUIMessage({event = "Stop"})
end

exports("Stop", Stop)

function IsActive()
	return _promise ~= nil
end

exports("IsActive", IsActive)

-- This is the only zyke_lib dependency, you could switch it out if you want to make it standalone
Z.registerKey("zyke_keyminigame:focusToggle", "LMENU", "DO NOT CHANGE", function()
	if (not _promise) then return end

	SendNUIMessage({event = "SetFocus", data = true})
end)

-- Will randomize between arrow keys
-- There's very few keys you can press that don't do anything else, running this export will use the arrow keys to avoid requiring focus to be toggled
---@param keyCount integer @The amount of keys to press
---@param timeLimit? integer @In seconds, time to complete the minigame otherwise you fail
---@return boolean, "success" | "fail" | "cancel"
function StartNonIntrusive(keyCount, timeLimit)
	if (_promise) then error("Minigame already started") return false, "cancel" end

	local keys = {"ARROWUP", "ARROWDOWN", "ARROWLEFT", "ARROWRIGHT"}
	local tempKeys = {}

	for i = 1, keyCount do
		local index = math.random(1, #keys)
		tempKeys[i] = keys[index]
	end

	keys = tempKeys

	SetNuiFocus(true, true)
	SetNuiFocusKeepInput(true)
	SendNUIMessage({
		event = "Start",
		data = {
			keys = keys,
			timeLimit = timeLimit or 10,
			nonIntrusive = true,
		}
	})

	_promise = promise.new()
	local state = Citizen.Await(_promise)
	SetNuiFocus(false, false)
	SetNuiFocusKeepInput(false)

	_promise = nil

	return state == "success", state
end

exports("StartNonIntrusive", StartNonIntrusive)

-- RegisterCommand("minigame", function()
-- 	local success = Start({"Q", "E"}, 5, 120)
-- 	print("Success: ", success)
-- end, false)

-- RegisterCommand("minigame_nonintrusive", function()
-- 	local success = StartNonIntrusive(10, 120)
-- 	print("Success: ", success)
-- end, false)

-- RegisterCommand("minigame_end", function()
-- 	Stop()
-- end, false)