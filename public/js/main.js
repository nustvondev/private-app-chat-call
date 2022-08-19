import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";

//init socket connection
const socket = io("/");
wss.registerSocketEvents(socket);


webRTCHandler.getLocalPreview();

//register event button copy
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

//register event connect chat button
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);
personalCodeChatButton.addEventListener("click", () => {
  console.log("Chat button click");
  //check code is exits
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
personalCodeVideoButton.addEventListener("click", () => {
  console.log("video button click");
  //check code is exits
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
