// ==UserScript==
// @name         Zendesk Merge Unchecker
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Unchecks the "Requester can see this comment" boxes upon ticket merge
// @author       Senff
// @updateURL    https://github.com/senff/Zendesk-merge-unchecker/raw/master/Zendesk-merge-unchecker.user.js
// @match        https://woothemes.zendesk.com/agent/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

// Trigger loop to check for the checkboxes
$("body").on('click','#merge_form input.buttonsubmit, #suggestion_columns a', function () {
    var checkForPopup = setInterval(function() {
        if ($('#ticket-merge').is(':visible')) {
            // Wait for checkboxes to be available
            if(($('#source_is_public').length) && ($('#target_is_public').length)) {
                $("#source_is_public, #target_is_public").prop("checked", false);
                clearInterval(checkForPopup);
            }
        } else {
            // End this silly loop
            clearInterval(checkForPopup);
        }
    }, 1000);
});

// This script was made for the sole purpose of getting a hug from eD.
