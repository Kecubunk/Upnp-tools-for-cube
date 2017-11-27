var os = require('os');
var ssdp = require("peer-ssdp/lib/peer-ssdp");
var SERVER = os.type() + "/" + os.release() + " UPnP/1.1 Linux/0.0.1";
var uuid = "6bd5eabd-b7c8-4f7b-ae6c-a30ccdeb5988";
var peer = ssdp.createPeer();

peer.on("ready", function () {
    //console.log("ready");
    console.log("");
    onReady();
    console.log("===================================================");})

    .on("found", function (headers, address){
    console.log("Device Found : ");
    //console.log("Device Found on : ", address);
    console.log(headers);
    console.log("===================================================");})

    .on("close", function () {
    //console.log("close");
    })

    .start();

var onReady = function () {
    //console.log("notify SSDP alive message");
    peer.alive({
        NT: "upnp:rootdevice",
        USN: "uuid:" + uuid + "::upnp:rootdevice",
        LOCATION: "http://{{networkInterfaceAddress}}/upnp/devices/6bd5eabd-b7c8-4f7b-ae6c-a30ccdeb5988/desc.xml",
        SERVER: SERVER
    });

    console.log("Search For Devices");
    console.log("");
    peer.search({
        ST: "upnp:rootdevice"
	//ST: "urn:Belkin:device:**"
    });

    setTimeout(function () {
        //console.log("notify SSDP byebye message");
        peer.byebye({
            NT: "upnp:rootdevice",
            USN: "uuid:" + uuid + "::upnp:rootdevice",
            LOCATION: "http://{{networkInterfaceAddress}}/upnp/devices/6bd5eabd-b7c8-4f7b-ae6c-a30ccdeb5988/desc.xml",
            SERVER: SERVER
        }, function () {
            peer.close();
	    console.log("");
        });
    }, 1000);
};
