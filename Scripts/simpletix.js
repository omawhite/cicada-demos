var isFullScreenIframe = false;
var eShowId = 0;
var eventHashUrl = null;
var originType = "";
var isMobile = false;
var isEmbedCheckOutPage = false;
var isLeaveCheckoutPageActive = false;
window.onload = () => {
  if (window.location.search.indexOf("autoopen=1") > 0) {
    setTimeout(() => {
      document.getElementById("GetEmbedTicketButton").click();
    }, 500);
  }

  document.onkeydown = (evt) => {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (
      isEscape &&
      typeof document.getElementsByClassName("smt-overlay") !== "undefined" &&
      document.getElementsByClassName("smt-overlay").length > 0
    ) {
      for (
        var i = 0;
        i < document.getElementsByClassName("smt-overlay").length;
        i++
      ) {
        if (
          window
            .getComputedStyle(document.getElementsByClassName("smt-overlay")[i])
            .getPropertyValue("display") === "block"
        ) {
          document.getElementsByClassName("smt-overlay")[i].remove();
          document.getElementsByTagName("body")[0].style.overflow = "auto";
          removeHashFromUrl();
        }
      }
    }
  };
};

function loadModelHtml(e, storeName) {
  var stringHtml =
    '<div id="simpletixe' +
    e +
    '" class="smt-overlay" style="z-index: 9999; display:none">'; //
  if (isFullScreenIframe) {
    stringHtml +=
      '<div class="nzopqftphl" style="width: 100%;height: 100%;margin: 0px;">';
  } else {
    stringHtml += '<div class="nzopqftphl">';
  }
  stringHtml +=
    '<a class="close" onClick="closeSimpletixEmbed(' +
    e +
    ');sendUrlToEmbed(false); return false;" href="#">&times;</a>';
  if (isFullScreenIframe) {
    stringHtml += '<div class="content" style="border-radius: 0px;">';
    stringHtml += "{{iframeReplace}}";
    stringHtml += "</div>";
    stringHtml += "</div>";
    stringHtml += "</div>";
  } else {
    stringHtml += '<div class="content">';
    stringHtml += "{{iframeReplace}}";
    stringHtml += "</div>";
    if (storeName && storeName.includes('"')) {
      storeName = storeName.replaceAll('"', "&quot;");
    }
    stringHtml +=
      '<div class="smt-footer"><span class="smt-powered-by">Powered by</span><a class="smt-logo-link" href="https://www.simpletix.com/?utm_source=platform&utm_medium=web&utm_campaign=magnificent&utm_content=footer_nav&a=text&brandname=' +
      storeName +
      "&utm_id=" +
      e +
      '"  target="_blank"><img src="https://cdn.simpletix.com/magnificent/images/trans-logo.png"></a></div>';
    stringHtml += "</div>";
    stringHtml += "</div>";
  }
  return stringHtml;
}

function createIframData(dataUrl, e, storeName, showTimeId, eventProtection) {
  var locationUrl = window.location.href;
  if (!originType) {
    originType =
      ((locationUrl.toLowerCase().includes("simpletix") ||
        dataUrl.includes("4100")) &&
        (locationUrl.toLowerCase().includes("/e/") ||
          locationUrl.toLowerCase().includes("/m/") ||
          locationUrl.toLowerCase().includes("/s/") ||
          locationUrl.toLowerCase().includes("/w/") ||
          locationUrl.toLowerCase().includes("/f/") ||
          locationUrl.toLowerCase().includes("/c/"))) ||
      (locationUrl.toLowerCase().includes(".simpletix") &&
        !locationUrl.toLowerCase().includes("/e/"))
        ? 0
        : 9;
  }
  var dataUrlPram =
    window.location.search == ""
      ? "?smtxorigin=" + originType + ""
      : window.location.search + "&smtxorigin=" + originType + "";

  if (
    typeof showTimeId !== "undefined" &&
    showTimeId != "" &&
    parseInt(showTimeId) > 0
  ) {
    dataUrlPram = dataUrlPram + "&time=" + showTimeId;
  }
  if (
    typeof eventProtection !== "undefined" &&
    eventProtection != "" &&
    parseInt(eventProtection) > 0
  ) {
    dataUrlPram = dataUrlPram + "&eventProtection=" + eventProtection;
  }
  var encodedUrl = encodeURI(dataUrl + dataUrlPram);
  if (encodedUrl && isMobile && window.self !== window.top) {
    removeLoader();
    window.top.location.href = encodedUrl;
    return;
  }
  var newChild =
    '<iframe id="embediFrame" class="smt-iframe" allow="payment" src="' +
    encodedUrl +
    '" frameborder="0" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency = "true"></iframe >';
  var popUpHtml = loadModelHtml(e, storeName).replace(
    "{{iframeReplace}}",
    newChild,
  );
  document
    .getElementsByTagName("body")[0]
    .insertAdjacentHTML("beforeend", popUpHtml);

  if (document.getElementById("smt_pinBoard")) {
    document.getElementById("smt_pinBoard").scrollIntoView({
      behavior: "smooth",
    });
  }
}

function addLoader() {
  const eventThemeColor = window.eventPageThemeColor
    ? window.eventPageThemeColor
    : "#2586B7";
  var loaderHtml =
    '<div id="blackBlocker" class="blockUI blockOverlay" style="z-index: 1000;border: none;margin: 0px;padding: 0px;width: 100%;height: 100%;top: 0px;left: 0px;background-color: rgb(0, 0, 0);opacity: 0.6;cursor: wait;position: fixed;"></div>';
  loaderHtml +=
    '<div id="simpleTixLoader" class="fbmchucgbcolMainDiv"><div class="fbmchucgbcol"></div><h3 class="smt-title">Processing... please wait</h3></div>';
  document
    .getElementsByTagName("body")[0]
    .insertAdjacentHTML("beforeend", loaderHtml);
  // for changing the loader color-MP-4524
  const loaderBorder = document.querySelector(".fbmchucgbcol");
  if (loaderBorder && eventThemeColor) {
    loaderBorder.style.borderTopColor = eventThemeColor;
    loaderBorder.style.borderBottomColor = eventThemeColor;
  }
}

function removeLoader() {
  if (document.getElementById("blackBlocker"))
    document.getElementById("blackBlocker").remove();
  if (document.getElementById("simpleTixLoader"))
    document.getElementById("simpleTixLoader").remove();
}

function calendarSimpleTixEmbed(ele, showId, showTimeId, eventUrl) {
  var applicationId = document.getElementById("smt_hdnApplicationId").value;
  var storeName = document.getElementById("smt_hdnStoreName").value;
  var eleDataUrl = document.createAttribute("data-url");
  eleDataUrl.value = document.getElementById("smt_hdnDataUrl").value;
  ele.setAttributeNode(eleDataUrl);
  var eleEnabledigitalwallets = document.createAttribute(
    "data-enabledigitalwallets",
  );
  eleEnabledigitalwallets.value = document.getElementById(
    "smt_hdnEnableDigitalWallets",
  ).value;
  ele.setAttributeNode(eleEnabledigitalwallets);
  createSimpleTixEmbed(
    ele,
    applicationId,
    showId,
    eventUrl,
    storeName,
    showTimeId,
  );
}

function createSimpleTixEmbed(
  ele,
  appId,
  showId,
  eventUrl,
  storeName,
  showTimeId,
  eventProtection,
) {
  if (typeof appId !== "undefined" && appId.length > 0) {
    addLoader();
    var frameUrl = ele.getAttribute("data-url");
    frameUrl = isOpenStgEmbed(frameUrl);
    var dataUrl = frameUrl + appId + "/" + showId;
    eShowId = showId;
    eventHashUrl = eventUrl;

    isMobile = /iphone|ipod|android|ie|blackberry|fennec/i.test(
      navigator.userAgent.toLowerCase(),
    );
    if (isMobile) {
      const queryParams = {};
      if (
        typeof showTimeId !== "undefined" &&
        showTimeId !== "" &&
        parseInt(showTimeId) > 0
      ) {
        queryParams.time = showTimeId;
      }

      if (
        typeof eventProtection !== "undefined" &&
        eventProtection !== "" &&
        parseInt(eventProtection) > 0
      ) {
        queryParams.eventProtection = eventProtection;
      }

      const queryStrings = window.location.search;
      if (typeof queryStrings !== "undefined" && queryStrings !== "") {
        const extraParams = new URLSearchParams(queryStrings);
        for (const [key, value] of extraParams.entries()) {
          queryParams[key] = value;
        }
      }

      const finalUrl = buildUrlWithParams(dataUrl, queryParams);
      removeLoader();
      window.location.href = finalUrl;
    } else {
      if (ele.getAttribute("data-modelsize") == "f") {
        isFullScreenIframe = true;
      }
      if (ele.getAttribute("data-origin")) {
        originType = ele.getAttribute("data-origin");
      }
      createIframData(dataUrl, showId, storeName, showTimeId, eventProtection);
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      sendUrlToEmbed(true);
      passConsentToEmbed();
    }
  }
}

function buildUrlWithParams(base, params) {
  const query = Object.entries(params || {})
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  return query ? `${base}?${query}` : base;
}

// open staging embed
function isOpenStgEmbed(frameUrl) {
  const urlParams = new URLSearchParams(window.location.search);
  if (frameUrl && frameUrl.includes("prod") && urlParams.get("stage")) {
    frameUrl = frameUrl.replace("prod", "stg");
  }
  return frameUrl;
}

function sendUrlToEmbed(toPostMessage) {
  if (!toPostMessage) {
    return false;
  } else {
    if (document.getElementById("embediFrame") && eventHashUrl) {
      var eventMethod = window.addEventListener
        ? "addEventListener"
        : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      eventer(
        messageEvent,
        (e) => {
          try {
            if (document.getElementById("embediFrame")) {
              document.getElementById("embediFrame").contentWindow.postMessage(
                {
                  rootUrl: window.location.href,
                  hashUrl: eventHashUrl,
                },
                "*",
              );
            } else return false;
          } catch (err) {
            console.log(err);
          }
        },
        false,
      );
    }
  }
}

function passConsentToEmbed() {
  if (document.getElementById("embediFrame") && eventHashUrl) {
    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(
      messageEvent,
      (e) => {
        try {
          const consentState = window.Termly
            ? window.Termly.getConsentState()
            : null;
          if (document.getElementById("embediFrame")) {
            document.getElementById("embediFrame").contentWindow.postMessage(
              {
                consent: consentState,
              },
              "*",
            );
          } else return false;
        } catch (err) {
          console.error(err);
        }
      },
      false,
    );
  }
}

function closeSimpletixEmbed(e, isPopState = false) {
  eShowId = e;
  if (
    isEmbedCheckOutPage &&
    !isPopState &&
    document.getElementById("embediFrame") &&
    !isLeaveCheckoutPageActive
  ) {
    document.getElementById("embediFrame").contentWindow.postMessage(
      {
        isCloseEmbed: true,
      },
      "*",
    );
  } else if (isLeaveCheckoutPageActive || isPopState) {
    document.getElementById("embediFrame").contentWindow.postMessage(
      {
        isLeaveCheckoutWithoutPrompt: true,
      },
      "*",
    );
  } else {
    isLeaveCheckoutPageActive = false;
    closeEmbedFrame(eShowId);
  }
}

function closeEmbedFrame(e) {
  isEmbedCheckOutPage = false;
  document.getElementById("simpletixe" + e).remove();
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  removeHashFromUrl();
}

window.onpopstate = () => {
  if (
    eventHashUrl &&
    eShowId &&
    !window.location.hash.includes(eventHashUrl) &&
    document.getElementById("simpletixe" + eShowId)
  ) {
    closeSimpletixEmbed(eShowId, true);
  }
};

function removeHashFromUrl() {
  var url = window.location.toString();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (url.indexOf("#") > 0 && eventHashUrl) {
    var cleanUrl = url.replace(eventHashUrl, "");
    window.history.replaceState({}, "", cleanUrl);
    if (urlParams.get("promocode")) {
      urlParams.delete("promocode");
      window.history.replaceState(null, "", window.location.pathname);
    }
  } else if (urlParams.get("promocode")) {
    if (urlParams.get("promocode")) {
      urlParams.delete("promocode");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(
  messageEvent,
  (e) => {
    try {
      var key = e.message ? "message" : "data";
      var data = e[key];
      if (data) {
        if (data.showMsg && data.showMsg.includes("simpletixe")) {
          document.getElementById(data.showMsg).style.cssText =
            "display: block; visibility: visible !important; opacity: 1 !important";
          removeLoader();
        } else if (data.onCheckoutCloseEmbed) {
          closeEmbedFrame(eShowId);
        } else if (Object.hasOwn(data, "isLeaveCheckoutPageActive")) {
          isLeaveCheckoutPageActive = data.isLeaveCheckoutPageActive;
        } else if (Object.hasOwn(data, "isEmbedCheckOutPage")) {
          isEmbedCheckOutPage = data.isEmbedCheckOutPage;
        } else if (data == "error") {
          removeLoader();
        }
      }
    } catch (er) {
      removeLoader();
    }
  },
  false,
);
var ajaxurl = "https://contact.simpletix.com";
if (location.origin.includes(".simpletix.us")) {
  ajaxurl = location.origin;
}
var isLimitedEvent = true;
var limit = 0;
document.addEventListener("DOMContentLoaded", () => {
  var applicationId = "";
  var appIdEle = document.getElementById("smt_hdnApplicationId");
  if (appIdEle) {
    applicationId = document.getElementById("smt_hdnApplicationId").value;
  }
  var currentMonth = document.getElementById("smt_monthAndYear");
  if (
    applicationId != undefined &&
    applicationId != null &&
    applicationId != ""
  ) {
    smtOnGetCalendar(applicationId, currentMonth);
  }
  var appIdPinEle = document.getElementById("smt_pinBoard");
  if (appIdPinEle) {
    if (document.getElementById("smt_displayStyle").value == "Cal") {
      isLimitedEvent = false;
    } else if (document.getElementById("smt_displayStyle").value == "Next100") {
      limit = 100;
    } else if (document.getElementById("smt_displayStyle").value == "Next50") {
      limit = 50;
    }

    document
      .getElementById("smt_hdnStoreName")
      .insertAdjacentHTML("afterEnd", searchWrapper);
    smtSearchPingBoard();
    if (!isLimitedEvent) {
      document.getElementById("smt_calenderBtn").style.cssText =
        "display: block";
    }
  }
});

function smtOnGetCalendar(applicationId, currentMonth) {
  var CalendarTable = document.getElementById("smt_CalendarTable");
  if (CalendarTable) {
    var xmlhttp = new XMLHttpRequest();
    var selectedInternalCategories = document.getElementById(
      "smt_selectedInternalCategories",
    )
      ? document.getElementById("smt_selectedInternalCategories").value
      : "";
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          document.getElementById("smt_CalendarTable").innerHTML =
            xmlhttp.responseText;
          var currentMonth =
            document.getElementById("smt_monthAndYear").textContent;
          var DateCheck =
            new Date().toLocaleString("en-us", { month: "long" }) +
            " " +
            new Date().getFullYear();
          if (currentMonth == DateCheck) {
            document.getElementById("smt_prevbtn").disabled = true;
          }
        } else if (xmlhttp.status == 400) {
          alert("There was an error 400");
        } else {
          alert("something else other than 200 was returned");
        }
      }
    };

    let calendarUrl =
      ajaxurl +
      "/Calendar/GetCalendar?applicationId=" +
      applicationId +
      "&currentDateTime=" +
      currentMonth;
    if (selectedInternalCategories)
      calendarUrl +=
        "&selectedInternalCategories=" +
        encodeURIComponent(selectedInternalCategories);

    xmlhttp.open("GET", calendarUrl, true);
    xmlhttp.send();
  }
}

function smtSearchPingBoard(selectedDate) {
  var serachText = document.getElementById("smt_txtSearch")
    ? document.getElementById("smt_txtSearch").value == undefined
      ? ""
      : document.getElementById("smt_txtSearch").value
    : "";

  document.getElementById("closebtn").style.display =
    serachText == "" ? "none" : "block";
  var appId = document.getElementById("smt_hdnApplicationId").value;
  var openEventPagetype = document.getElementById("smt_openEventPageType")
    ? parseInt(document.getElementById("smt_openEventPageType").value)
    : 0;
  var isDisplayEventCategory = document.getElementById(
    "smt_isDisplayEventCategory",
  )
    ? parseInt(document.getElementById("smt_isDisplayEventCategory").value)
    : 1;
  var selectedEventCategories = document.getElementById(
    "smt_selectedEventCategories",
  )
    ? document.getElementById("smt_selectedEventCategories").value
    : "";
  var selectedInternalCategories = document.getElementById(
    "smt_selectedInternalCategories",
  )
    ? document.getElementById("smt_selectedInternalCategories").value
    : "";
  const params = new URLSearchParams(window.location.search);
  var affiliate;
  if (params.get("affiliate")) {
    affiliate = params.get("affiliate").replaceAll(" ", "+");
  } else {
    affiliate = "";
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        document.getElementById("smt_Showlist").innerHTML =
          xmlhttp.responseText;
        document.getElementById("smt_selectedDate").textContent =
          document.getElementById("smt_StartTime").value;

        var currentMonth = document.getElementById("smt_StartTime").value;
        var DateCheck =
          new Date().toLocaleString("en-us", { month: "long" }) +
          " " +
          new Date().getFullYear();
        if (currentMonth == DateCheck) {
          document.getElementById("smt_prevPinBoardbtn").disabled = true;
        }
      } else if (xmlhttp.status == 400) {
        alert("There was an error 400");
      } else {
        alert("something else other than 200 was returned");
      }
    }
  };

  let pinBoardURL =
    ajaxurl +
    "/Calendar/GetPinBoard?applicationId=" +
    appId +
    "&searchText=" +
    serachText +
    "&dateTime=" +
    selectedDate +
    "&isLimitedEvent=" +
    isLimitedEvent +
    "&openEventPageType=" +
    openEventPagetype +
    "&isDisplayEventCategory=" +
    isDisplayEventCategory +
    "&selectedEventCategories=" +
    encodeURIComponent(selectedEventCategories) +
    "&limit=" +
    limit +
    "&affiliate=" +
    affiliate;

  if (selectedInternalCategories) {
    pinBoardURL +=
      "&selectedInternalCategories=" +
      encodeURIComponent(selectedInternalCategories);
  }

  xmlhttp.open("GET", pinBoardURL, true);
  xmlhttp.send();
}

function smtClickPinNextPrevi(action) {
  if (action === "n") {
    smtSearchPingBoard(document.getElementById("smt_nextPingBoardDate").value);
    document.getElementById("smt_prevPinBoardbtn").disabled = false;
  } else {
    smtSearchPingBoard(document.getElementById("smt_prePingBoardDate").value);
  }
}

function smtClearSearchText() {
  if (document.getElementById("smt_txtSearch").value.length > 0) {
    document.getElementById("smt_txtSearch").value = "";
    smtSearchPingBoard();
  }
}

var searchWrapper = `<section class="smt-upcoming_events">
        <div class="smt-wrapper-inner"> <div class="smt-search-wrapper">
                <div class="smt-search-control">
                    <input type="text" id="smt_txtSearch" onkeyup="smtSearchPingBoard()" placeholder="Search by event name...">
                    <button class="smt-close-icon" id="closebtn" onclick="smtClearSearchText()">
                        x
                    </button>
                </div>
                <div class="smt-search-control smt-date-control smt-btnprevnext" id="smt_calenderBtn" style="display:none">
                    <button type="button" onclick="smtClickPinNextPrevi('p')" id="smt_prevPinBoardbtn">
                        <img src="https://cdn.simpletix.com/magnificent/images/left-arrow.png">
                    </button>
                    <span class="smt-card-header" type="text" id="smt_selectedDate"></span>
                    <button class="smt-right-arrow" onclick="smtClickPinNextPrevi('n')">
                        <img src="https://cdn.simpletix.com/magnificent/images/left-arrow.png">
                    </button>
                </div>
            </div>
           <div id="smt_Showlist"></div>
</div></section>`;
