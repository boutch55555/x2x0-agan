#!/usr/bin/env node
var HID = require('node-hid');
fs = require('fs');

var devices = HID.devices();
device = new HID.HID(4292,33742); // same ID for both boards I got

// Board has 16 levels, the OS sees 21, so I remap the values and keep the 5 extra at max brightness. 
// Mappings might be off depending on the driver. Check values on /sys/class/backlight/*/actual_brightness.
// Was 0-100 by 5 intervals in my case. With the edp kernel patch it was 1-4439 with 222 increments.
var mapping = [['0', '0'], ['5', '16'],['10', '32'], ['15', '48'], ['20', '64'], ['25', '80'], ['30', '96'], ['35', '112'], ['40', '128'], ['45', '144'], ['50', '160'], ['55', '176'], ['60', '192'], ['65', '208'], ['70', '224'], ['75', '240'], ['80', '240'], ['85', '240'], ['90', '240'], ['95', '240'], ['100', '240']]

var myMap = new Map(mapping);

// file path might change depending on the driver. 
fs.readFile('/sys/class/backlight/acpi_video0/actual_brightness', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.replace("\n", ''); // clear the newline
  data = myMap.get(data); // get corresponding value
  data = parseInt(data); 
  device.write([6, data]); // send to the usb device
//  console.log(data);
});
