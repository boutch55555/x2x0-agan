# x2x0-agan
Linux driver for agan x220 / x230 fhd mod

Requires nodejs, node-hid and inotifywait.

Usage :
while inotifywait -qq -e modify /sys/class/backlight/acpi_video0/actual_brightness ; do ./setbrightness.js; done
