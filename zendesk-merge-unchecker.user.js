// ==UserScript==
// @name         Zendesk Merge Unchecker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Unchecks the "Requester can see this comment" boxes upon ticket merge
// @author       Senff
// @downloadURL  https://github.com/Automattic/support-helper-tools/raw/main/zendesk-enhancements/zendesk-merge-unchecker/zendesk-merge-unchecker.user.js
// @updateURL    https://github.com/Automattic/support-helper-tools/raw/main/zendesk-enhancements/zendesk-merge-unchecker/zendesk-merge-unchecker.user.js
// @match        https://*.zendesk.com/agent/*
// @grant        none
// ==/UserScript==

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
