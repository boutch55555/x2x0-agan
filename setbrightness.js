#!/usr/bin/env node
var HID = require('node-hid');
fs = require('fs');

var devices = HID.devices();
device = new HID.HID(4292,33742);

var mapping = [['0', '0'], ['5', '16'],['10', '32'], ['15', '48'], ['20', '64'], ['25', '80'], ['30', '96'], ['35', '112'], ['40', '128'], ['45', '144'], ['50', '160'], ['55', '176'], ['60', '192'], ['65', '208'], ['70', '224'], ['75', 240], ['80', '240'], ['85', '240'], ['90', '240'], ['95', '240'], ['100', '240']]

var myMap = new Map(mapping);

fs.readFile('/sys/class/backlight/acpi_video0/actual_brightness', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.replace("\n", '');
  data = myMap.get(data);
  data = parseInt(data);
  device.write([6, data]);
//  console.log(raw);
//  console.log(data);
});
