fx_version "cerulean"
version "1.1.0"
use_experimental_fxv2_oal "yes"
game "gta5"
lua54 "yes"
author "discord.gg/zykeresources"

shared_script "@zyke_lib/imports.lua" -- Only used for registerKey
client_script "client.lua"

ui_page "nui/index.html"
-- ui_page "nui_source/hot_reload.html" -- Dev

files {
    "nui/**/*",
    -- "nui_source/hot_reload.html", -- Dev
}