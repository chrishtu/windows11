var listeners = {};
function listenEvent(name, id, func) {
  if (typeof listeners[name] === 'undefined') {
    listeners[name] = Object.create(null);
  }

  listeners[name][id] = func;
}
function triggerEvent(name, data) {
  if (typeof listeners[name] === 'undefined') return;

  for (var key in listeners[name]) {
    listeners[name][key](data);
  }
}

var imgPath = 'imgs/icons/Apps/';

function getAppIconPath(img) {
  return imgPath + img;
}

var AppInfo = {
  settings: {
    name: 'settings',
    productName: 'Settings',
    icon: /*#__PURE__*/getAppIconPath('settings.png')
  },
  notepad: {
    name: 'notepad',
    productName: 'NotePad',
    icon: /*#__PURE__*/getAppIconPath('notepad.png')
  },
  explorer: {
    name: 'explorer',
    productName: 'File Explorer',
    icon: /*#__PURE__*/getAppIconPath('explorer.png')
  },
  word: {
    name: 'word',
    productName: 'Word',
    icon: /*#__PURE__*/getAppIconPath('word.png')
  },
  powerpoint: {
    name: 'powerpoint',
    productName: 'PowerPoint',
    icon: /*#__PURE__*/getAppIconPath('powerpoint.png')
  },
  onenote: {
    name: 'onenote',
    productName: 'OneNote',
    icon: /*#__PURE__*/getAppIconPath('onenote.png')
  },
  mail: {
    name: 'mail',
    productName: 'Mail',
    icon: /*#__PURE__*/getAppIconPath('mail.png')
  },
  todo: {
    name: 'todo',
    productName: 'To Do',
    icon: /*#__PURE__*/getAppIconPath('todo.png')
  },
  store: {
    name: 'store',
    productName: 'Store',
    icon: /*#__PURE__*/getAppIconPath('store.png')
  },
  photos: {
    name: 'photos',
    productName: 'Photos',
    icon: /*#__PURE__*/getAppIconPath('photos.png')
  },
  yourphone: {
    name: 'yourphone',
    productName: 'Your Phone',
    icon: /*#__PURE__*/getAppIconPath('yourphone.png')
  },
  whiteboard: {
    name: 'whiteboard',
    productName: 'White Board',
    icon: /*#__PURE__*/getAppIconPath('whiteboard.png')
  },
  calculator: {
    name: 'calculator',
    productName: 'Calculator',
    icon: /*#__PURE__*/getAppIconPath('calculator.png')
  },
  spotify: {
    name: 'spotify',
    productName: 'Spotify',
    icon: /*#__PURE__*/getAppIconPath('spotify.png')
  },
  twitter: {
    name: 'twitter',
    productName: 'Twitter',
    icon: /*#__PURE__*/getAppIconPath('twitter.png')
  },
  vscode: {
    name: 'vscode',
    productName: 'VS Code',
    icon: /*#__PURE__*/getAppIconPath('vscode.png')
  },
  terminal: {
    name: 'terminal',
    productName: 'Terminal',
    icon: /*#__PURE__*/getAppIconPath('terminal.png')
  },
  github: {
    name: 'github',
    productName: 'GitHub',
    icon: /*#__PURE__*/getAppIconPath('github.png')
  },
  discord: {
    name: 'discord',
    productName: 'Discord',
    icon: /*#__PURE__*/getAppIconPath('discord.png')
  }
};
var ListApp = /*#__PURE__*/Object.keys(AppInfo).map(function (appName) {
  return AppInfo[appName];
});

function sortbyName(a, b) {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  return 0;
}

function AppInfoGroup() {
  var sortedApps = ListApp.sort(sortbyName);
  var groupApps = {};
  var sortedAppsLen = sortedApps.length;

  for (var index = 0; index < sortedAppsLen; index++) {
    var app = sortedApps[index];
    var letter = app.name.substring(0, 1).toUpperCase();

    if (/[A-Z]/.test(letter)) ; else if (/[0-9]/.test(letter)) {
      // Is Number
      letter = '#';
    } else {
      // Is special character
      letter = '&';
    }

    if (!groupApps[letter]) {
      groupApps[letter] = [];
    }

    groupApps[letter].push(app);
  }

  return groupApps;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function appendChild(parent, item) {
  if (typeof item === 'undefined' || item === null) return;

  if (item instanceof HTMLElement) {
    parent.appendChild(item);
  } else {
    if (item instanceof Array) {
      appendChilds(parent, item);
    } else {
      parent.appendChild(document.createTextNode(item.toString()));
    }
  }
}
function appendChilds(parent, child) {
  if (child instanceof Array) {
    child.forEach(function (item) {
      appendChild(parent, item);
    });
  } else {
    appendChild(parent, child);
  }
}
function createElement(tagName, props, children) {
  var element = document.createElement(tagName);

  if (props) {
    var _props = props;

    for (var prop in _props) {
      if (prop === 'style') {
        var style = _props[prop];

        for (var key in style) {
          if (key.indexOf('-') > -1) {
            element.style.setProperty(key, style[key]);
          } else {
            element.style[key] = style[key];
          }
        }
      } else {
        if (prop.indexOf('-') > -1 || prop.indexOf(':') > -1) {
          var propVal = _props[prop];
          element.setAttribute(prop, propVal);
        } else {
          element[prop] = _props[prop];
        }
      }
    }
  }

  if (children) {
    appendChilds(element, children);
  }

  return element;
}

var eventNames = {
  themeChange: 'theme-change',
  blurChange: 'blur-change',
  nightLightChange: 'night-light-change',
  closePopup: 'close-popup',
  showPopup: 'show-popup',
  hidePopup: 'hide-popup',
  createWindow: 'create-window',
  startProcess: 'start-process',
  viewWindow: 'view-window',
  restoreView: 'restore-view',
  showDesktopHover: 'show-desktop-hover',
  showDesktopOut: 'show-desktop-out',
  showDesktop: 'show-desktop',
  blurAllWindow: 'blur-all-window',
  brightnessChange: 'brightness-change',
  transparentChange: 'transparency-change'
};

var wallpapers = [];

for (var index = 1; index <= 22; index++) {
  var name = 'IMG' + index + '.jpg';
  wallpapers.push({
    name: name,
    path: 'imgs/Wallpapers/' + name,
    thumbnailPath: 'imgs/Wallpapers/Thumbnails/' + name
  });
}

var appState = {
  darktheme: false,
  transparency: false,
  backgroundImage: wallpapers[15].path,
  volume: 100,
  brightness: 100,
  nightlight: false
};

try {
  var data = /*#__PURE__*/localStorage.getItem('preferences');
  if (data) appState = /*#__PURE__*/JSON.parse(data);
} catch (e) {}

function getState(keys) {
  if (typeof keys === 'string') {
    var _ref;

    return _ref = {}, _ref[keys] = appState[keys], _ref;
  }

  if (keys instanceof Array) {
    var _data = {};

    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];
      _data[key] = appState[key];
    }

    return _data;
  }

  return appState;
}
function setState(state) {
  appState = _extends({}, appState, state);
  localStorage.setItem('preferences', JSON.stringify(appState));
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateID(len) {
  if (len === void 0) {
    len = 8;
  }

  var text = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
var isWebkit = /*#__PURE__*/ /webkit/.test( /*#__PURE__*/navigator.userAgent.toLowerCase());
function getExt(path) {
  return path.substring(path.lastIndexOf('.'), path.length);
}
function readFile(path, cb) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4) cb(req.responseText);
  };

  req.open('get', path);
  req.send();
}
function getFileName(path) {
  return path.substring(path.lastIndexOf('/') + 1, path.length);
}
function enableDarkTheme(darktheme) {
  document.documentElement.classList[darktheme ? 'add' : 'remove']('dark');
  setState({
    darktheme: darktheme
  });
  triggerEvent(eventNames.themeChange, darktheme);
}
function toggleTheme(cb) {
  var _getState = getState('darktheme'),
      darktheme = _getState.darktheme;

  enableDarkTheme(!darktheme);

  if (typeof cb === 'function') {
    cb(!darktheme);
  }
}
function setTransparencyEffect(transparency) {
  document.documentElement.classList[transparency ? 'add' : 'remove']('glass');
  setState({
    transparency: transparency
  });
  triggerEvent(eventNames.transparentChange, transparency);
}
function toggleTransparency() {
  var _getState2 = getState('transparency'),
      transparency = _getState2.transparency;

  setTransparencyEffect(!transparency);
}
function round(value, decimals) {
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
}

function WindowIcon(path) {
  var style = {};

  if (path) {
    style.backgroundImage = "url(\"" + path + "\")";
  }

  var windowIcon = createElement('div', {
    className: 'window-titlebar-icon flex content-center items-center flex-shrink-0',
    style: style
  });

  function setWindowIcon(path) {
    if (path) {
      windowIcon.style.backgroundImage = "url(\"" + path + "\")";
    }
  }

  return {
    element: windowIcon,
    setWindowIcon: setWindowIcon
  };
}

var En = {
  window: {
    titlebar: {
      buttons: {
        minimize: 'Minimize',
        maximize: 'Restore Down',
        maximizeDown: 'Maximize',
        close: 'Close'
      }
    }
  }
};

var Vi = {
  window: {
    titlebar: {
      buttons: {
        minimize: 'Thu gọn',
        maximize: 'Thu nhỏ',
        maximizeDown: 'Phóng to',
        close: 'Đóng'
      }
    }
  }
};

var localeMap = {
  'en-us': En,
  'vi-vn': Vi
};
function getLocale(locale) {
  return localeMap[locale];
}

var minimizeIcon = "\n<svg aria-hidden=\"true\" version=\"1.1\" width=\"10\" height=\"10\">\n<path d=\"M 0,5 10,5 10,6 0,6 Z\"></path>\n</svg>\n";
var maximizeIcon = "\n<svg aria-hidden=\"true\" version=\"1.1\" width=\"10\" height=\"10\">\n<path d=\"m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z\"></path>\n</svg>\n";
var maximizeDownIcon = "\n<svg aria-hidden=\"true\" version=\"1.1\" width=\"10\" height=\"10\">\n<path d=\"M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z\"></path>\n</svg>\n";
var closeIcon = "\n<svg aria-hidden=\"true\" version=\"1.1\" width=\"10\" height=\"10\">\n<path d=\"M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z\"></path>\n</svg>\n";
function TitleBarButtons(options, events) {
  var locale = getLocale('en-us'); // const locale = getLocale('vi-vn')

  var maximizeState = getMaximizeState(options.isMaximized);
  var maximizeButton = createElement('div', {
    title: maximizeState.title,
    className: 'window-titlebar-button window-titlebar-maximize-button flex items-center content-center' + (options.disableMaximize ? ' disabled' : ''),
    innerHTML: maximizeState.icon,
    onclick: events.onMaximizeButtonClick
  });
  var buttons = createElement('div', {
    className: 'window-titlebar-buttons flex items-center'
  }, [createElement('div', {
    title: locale.window.titlebar.buttons.minimize,
    className: 'window-titlebar-button window-titlebar-minimize-button flex items-center content-center',
    innerHTML: minimizeIcon,
    onclick: events.onMinimizeButtonClick
  }), maximizeButton, createElement('div', {
    title: locale.window.titlebar.buttons.close,
    className: 'window-titlebar-button window-titlebar-close-button flex items-center content-center',
    innerHTML: closeIcon,
    onclick: events.onCloseButtonClick
  })]);

  function setMaximize(maximized) {
    var maximizeState = getMaximizeState(maximized);
    maximizeButton.title = maximizeState.title;
    maximizeButton.innerHTML = maximized ? maximizeIcon : maximizeDownIcon;
  }

  function getMaximizeState(maximized) {
    return {
      title: maximized ? locale.window.titlebar.buttons.maximize : locale.window.titlebar.buttons.maximizeDown,
      icon: maximized ? maximizeIcon : maximizeDownIcon
    };
  }

  return {
    element: buttons,
    setMaximize: setMaximize
  };
}

function Title(options, onDoubleClick) {
  var textElem;
  var title = createElement('div', {
    className: 'window-title flex items-center',
    ondblclick: !options.disableMaximize ? onDoubleClick : null
  }, textElem = createElement('div', {
    className: 'text-ellipsis'
  }, options.title));

  function setTitle(text) {
    textElem.textContent = text;
  }

  return {
    element: title,
    setTitle: setTitle
  };
}

function TitleBar(options, events) {
  var windowIcon = WindowIcon(options.icon);
  var windowTitle = Title({
    title: options.title,
    disableMaximize: options.disableMaximize
  }, events.onDoubleClick);
  var windowButtons = TitleBarButtons({
    isMaximized: options.maximized,
    disableMaximize: options.disableMaximize
  }, {
    onMinimizeButtonClick: events.onMinimizeButtonClick,
    onMaximizeButtonClick: events.onMaximizeButtonClick,
    onCloseButtonClick: events.onCloseButtonClick
  });
  var titlebar;
  var mouseOver = false;
  titlebar = createElement('div', {
    className: 'window-titlebar flex items-center' + (options.icon ? '' : ' no-icon')
  }, [windowIcon.element, windowTitle.element, windowButtons.element]);

  if (options.autoHide) {
    titlebar.addEventListener('mouseover', function () {
      mouseOver = true;
    }, false);
    titlebar.addEventListener('mouseout', function () {
      mouseOver = false;
    }, false);
  }

  function setAutoHide(autoHide) {
    if (autoHide) {
      titlebar.classList.remove('titlebar-fade-in');

      if (!mouseOver) {
        titlebar.classList.add('titlebar-fade-out');
        events.onHidden && events.onHidden();
      }
    } else {
      titlebar.classList.add('titlebar-fade-in');
      titlebar.classList.remove('titlebar-fade-out');
      events.onVisible && events.onVisible();
    }
  }

  function setPreventHide(hide) {
    mouseOver = hide;
  }

  function setVisible(visible) {
    visible ? titlebar.classList.remove('hidden') : titlebar.classList.add('hidden');
  }

  return {
    element: titlebar,
    titleElem: windowTitle.element,
    setIcon: windowIcon.setWindowIcon,
    setTitle: windowTitle.setTitle,
    setMaximize: windowButtons.setMaximize,
    setVisible: setVisible,
    setAutoHide: setAutoHide,
    setPreventHide: setPreventHide
  };
}

function dragElement(elmnt, dragTrigger, events) {
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (dragTrigger) {
    dragTrigger.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;

    if (events && typeof events.onDragStart === 'function') {
      events.onDragStart();
    }
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    var deltaX = elmnt.offsetTop - pos2;
    var deltaY = elmnt.offsetLeft - pos1;
    elmnt.style.top = deltaX + 'px';
    elmnt.style.left = deltaY + 'px';

    if (events && typeof events.onDrag === 'function') {
      events.onDrag({
        x: e.clientX,
        y: e.clientY
      });
    }
  }

  function closeDragElement() {
    if (events && typeof events.onDragEnd === 'function') {
      events.onDragEnd(elmnt);
    }
    /* stop moving when mouse button is released:*/


    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function resizeElem(elem, trigger, keepAspectRatio, aspectRatio, events) {
  var _keepAspectRatio = keepAspectRatio;
  var _aspectRatio = aspectRatio;
  trigger.addEventListener('mousedown', initialiseResize, false);
  var curDirections = [];
  var lastX = 0,
      lastY = 0,
      x = 0,
      y = 0,
      w = 0,
      h = 0,
      mOffX = 0,
      mOffY = 0,
      // A known offset between position & mouse.
  minHeight = 0,
      minWidth = 0,
      minLeft,
      maxLeft,
      // Bounding box area, in pixels.
  minTop,
      maxTop;

  function initialiseResize(e) {
    var elemStyle = window.getComputedStyle(elem);
    x = parseInt(elemStyle.left);
    y = parseInt(elemStyle.top);
    w = elem.offsetWidth;
    h = elem.offsetHeight;
    minHeight = parseInt(elemStyle.minHeight);
    minWidth = parseInt(elemStyle.minWidth);
    lastX = e.clientX;
    lastY = e.clientY;
    window.addEventListener('mousemove', startResizing, false);
    window.addEventListener('mouseup', stopResizing, false);
    var target = e.currentTarget;
    var determize = target.dataset.resize;
    var cursorStyle = 'default';

    if (determize === 't') {
      curDirections = ['t'];
      cursorStyle = 'ns-resize';
    }

    if (determize === 'l') {
      curDirections = ['l'];
      cursorStyle = 'ew-resize';
    }

    if (determize === 'b') {
      curDirections = ['b'];
      cursorStyle = 'ns-resize';
    }

    if (determize === 'r') {
      curDirections = ['r'];
      cursorStyle = 'ew-resize';
    }

    if (determize === 'tl') {
      curDirections = ['t', 'l'];
      cursorStyle = 'nw-resize';
    }

    if (determize === 'bl') {
      curDirections = ['b', 'l'];
      cursorStyle = 'ne-resize';
    }

    if (determize === 'br') {
      curDirections = ['b', 'r'];
      cursorStyle = 'nw-resize';
    }

    if (determize === 'tr') {
      curDirections = ['t', 'r'];
      cursorStyle = 'ne-resize';
    }

    elem.classList.add('no-pointer-events');
    document.body.style.cursor = cursorStyle;

    if (events && typeof events.onResizeStart === 'function') {
      events.onResizeStart();
    }
  }

  function startResizing(e) {
    var deltaX = e.clientX - lastX + mOffX;
    var deltaY = e.clientY - lastY + mOffY;
    mOffX = 0;
    mOffY = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    var dY = deltaY,
        dX = deltaX;

    for (var index = 0; index < curDirections.length; index++) {
      var dr = curDirections[index];

      if (dr === 't') {
        if (h - dY < minHeight) mOffY = dY - (deltaY = h - minHeight);else if (y + dY < minTop) mOffY = dY - (deltaY = minTop - y);
        y += deltaY;
        h -= deltaY;

        if (_keepAspectRatio) {
          w = Math.round(h * _aspectRatio);
        }
      }

      if (dr === 'l') {
        if (w - dX < minWidth) mOffX = dX - (deltaX = w - minWidth);else if (x + dX < minLeft) mOffX = dX - (deltaX = minLeft - x);
        x += deltaX;
        w -= deltaX;

        if (_keepAspectRatio) {
          h = Math.round(w / _aspectRatio);
        }
      }

      if (dr === 'b') {
        if (h + dY < minHeight) mOffY = dY - (deltaY = minHeight - h);else if (y + h + dY > maxTop) mOffY = dY - (deltaY = maxTop - y - h);
        h += deltaY;

        if (_keepAspectRatio) {
          w = Math.round(h * _aspectRatio);
        }
      }

      if (dr === 'r') {
        if (w + dX < minWidth) mOffX = dX - (deltaX = minWidth - w);else if (x + w + dX > maxLeft) mOffX = dX - (deltaX = maxLeft - x - w);
        w += deltaX;

        if (_keepAspectRatio) {
          h = Math.round(w / _aspectRatio);
        }
      }
    }

    elem.style.top = y + 'px';
    elem.style.left = x + 'px';
    elem.style.width = w + 'px';
    elem.style.height = h + 'px';

    if (events && typeof events.onResize === 'function') {
      events.onResize();
    }
  }

  function stopResizing() {
    mOffX = 0;
    mOffY = 0;

    if (events && typeof events.onResizeEnd === 'function') {
      events.onResizeEnd();
    }

    elem.classList.remove('no-pointer-events');
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', startResizing, false);
    window.removeEventListener('mouseup', stopResizing, false);
  }

  function setAspectRatio(ratio) {
    _aspectRatio = ratio;
  }

  function setKeepAspectRatio(keep) {
    _keepAspectRatio = keep;
  }

  return {
    setAspectRatio: setAspectRatio,
    setKeepAspectRatio: setKeepAspectRatio
  };
}

var shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var titlebarHeight = 29;
var taskbarHeight = 40;

var iconColor = function iconColor() {
  return 'var(--window-icon-color)';
};

var windowIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n<path\n  d=\"M 3 3 L 11 3 L 11 11 L 3 11 L 3 3 z M 11 13 L 11 21 L 3 21 V 13 L 11 13 z M 13 3 L 21 3 V 11 L 13 11 V 3 z M 21 13 L 21 21 L 13 21 L 13 13 L 21 13 z\" />\n</svg>\n";
var settingIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"" + /*#__PURE__*/iconColor() + "\"><path d=\"M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z\"></path><path d=\"m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z\"></path></svg>\n";
var wifiIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\">\n  <circle cx=\"12\" cy=\"17\" r=\"1\" style=\"fill: " + /*#__PURE__*/iconColor() + "\" />\n  <path d=\"M9.172 14a4 4 0 0 1 5.656 0\" />\n  <path d=\"M6.343 12a8 8 0 0 1 11.314 0\" />\n  <path d=\"M3.515 9.5c4.686 -4.687 12.284 -4.687 17 0\" />\n</svg>\n";
var volumeIcon2 = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"" + /*#__PURE__*/iconColor() + "\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path></svg>\n";
var batteryIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" fill=\"none\" stroke-linejoin=\"round\">\n<rect x=\"5.5\" y=\"7.5\" width=\"14\" height=\"9\" stroke=\"" + /*#__PURE__*/iconColor() + "\"/>\n<rect x=\"7\" y=\"9\" width=\"11\" height=\"6\" fill=\"" + /*#__PURE__*/iconColor() + "\"/>\n<rect x=\"19.5\" y=\"10\" width=\"1.5\" height=\"4\" fill=\"" + /*#__PURE__*/iconColor() + "\"/>\n</svg>\n";
var closeIcon$1 = "\n<svg aria-hidden=\"true\" version=\"1.1\" width=\"10\" height=\"10\">\n<path d=\"M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z\"></path>\n</svg>\n";
var powerIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" fill=\"none\" stroke=\"" + /*#__PURE__*/iconColor() + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<path d=\"M7 6a7.75 7.75 0 1 0 10 0\" />\n<line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"12\" />\n</svg>\n";
var chevronUpIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<polyline points=\"6 15 12 9 18 15\" />\n</svg>\n";
var chevronRightIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke=\"" + /*#__PURE__*/iconColor() + "\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<polyline points=\"9 6 15 12 9 18\" />\n</svg>\n ";
var chevronLeftIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n  <polyline points=\"15 6 9 12 15 18\" />\n</svg>\n ";
var bluetoothIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<polyline points=\"7 8 17 16 12 20 12 4 17 8 7 16\" />\n</svg>\n";
var airplaneModeIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<path d=\"M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z\" />\n</svg>\n";
var moonIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z\" />\n</svg>\n";
var locationIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"" + /*#__PURE__*/iconColor() + "\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n<circle cx=\"12\" cy=\"12\" r=\"4\" style=\"fill: " + /*#__PURE__*/iconColor() + "\"/>\n<circle cx=\"12\" cy=\"12\" r=\"9\"/>\n</svg>\n";
var darkThemeIcon = "\n<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" class=\"no-stroke\">\n  <circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"#000\" />\n  <circle cx=\"12\" cy=\"12\" r=\"8\" fill=\"#fff\" />\n  <path d=\"M12 21A2 2 1 0 1 12 3\" fill=\"#000\" />\n</svg>\n";
var sunIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + /*#__PURE__*/iconColor() + "\"\n  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n  <line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"5\"></line>\n  <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line>\n  <line x1=\"4\" y1=\"4\" x2=\"7\" y2=\"7\"></line>\n  <line x1=\"17\" y1=\"17\" x2=\"20\" y2=\"20\"></line>\n  <line x1=\"1\" y1=\"12\" x2=\"5\" y2=\"12\"></line>\n  <line x1=\"19\" y1=\"12\" x2=\"23\" y2=\"12\"></line>\n  <line x1=\"4\" y1=\"20\" x2=\"7\" y2=\"17\"></line>\n  <line x1=\"17\" y1=\"7\" x2=\"20\" y2=\"4\"></line>\n</svg>\n";
var nightLightIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + /*#__PURE__*/iconColor() + "\"\nstroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<circle cx=\"12\" cy=\"12\" r=\"5\"></circle>\n<circle cx=\"10\" cy=\"11\" r=\"2\" fill=\"" + /*#__PURE__*/iconColor() + "\"></circle>\n<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line>\n<line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line>\n<line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line>\n<line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line>\n<line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line>\n<line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line>\n<line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line>\n<line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>\n</svg>\n";
var castIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\nstroke=\"" + /*#__PURE__*/iconColor() + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\">\n</path>\n<line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line>\n</svg>\n";
var transparencyIcon = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" fill=\"none\" stroke=\"" + /*#__PURE__*/iconColor() + "\">\n<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" />\n<line x1=\"6\" x2=\"10\" y1=\"10\" y2=\"6\" />\n<line x1=\"6\" x2=\"18\" y1=\"18\" y2=\"6\" />\n<line x1=\"14\" x2=\"18\" y1=\"18\" y2=\"14\" />\n</svg>\n";

function createWindow(appName, args) {
  //To Index
  triggerEvent(eventNames.createWindow, {
    appName: appName,
    args: args
  });
}
function startProcess(processInfo) {
  triggerEvent(eventNames.startProcess, processInfo);
}

var thumbnailElement;
var thumbnailHideTimeout;
var firstInitTimeout;
function TaskBarAppThumbnails(instances, iconBounds) {
  if (thumbnailElement instanceof HTMLDivElement) {
    thumbnailElement.innerHTML = '';
    init();
    return;
  }

  function getThumbnails() {
    return instances.map(function (win) {
      var winWidth = parseInt(win.element.style.width);
      var winHeight = parseInt(win.element.style.height);
      var thumbnail = win.element.cloneNode(true);
      thumbnail.classList.add('taskbar-app-thumbnail-content');
      var thumbnailScale = 120 / winHeight;

      if (thumbnailScale * winWidth > 200) {
        thumbnailScale = 200 / winWidth;
      }

      thumbnail.style.transform = "scale(" + thumbnailScale + ")";
      return {
        container: createElement('div', {
          title: win.getTitle(),
          className: 'taskbar-app-thumbnail' + (win.isFocused() ? ' active' : ''),
          onmouseover: onmouseover.bind(null, win.id),
          onmouseout: onmouseout.bind(null, win.id)
        }, [createElement('div', {
          className: 'taskbar-app-thumbnail-inner relative w-full h-full fade-in',
          onclick: onThumbnailClick.bind(null, win)
        }, thumbnail), createElement('div', {
          title: 'Close',
          className: 'taskbar-app-thumbnail-close-button flex content-center items-center',
          innerHTML: closeIcon$1,
          onclick: function onclick() {
            win.close();
            closeThumbnails();
            restoreView();
          }
        })]),
        thumbnail: thumbnail
      };
    });
  }

  function onmouseover(id) {
    //To Window Manager
    triggerEvent(eventNames.viewWindow, {
      id: id
    }); //To Popup

    triggerEvent(eventNames.hidePopup);
  }

  function onmouseout(id) {
    restoreView(id); //To Popup

    triggerEvent(eventNames.showPopup);
  }

  function restoreView(id) {
    //To Window Manager
    triggerEvent(eventNames.restoreView, {
      id: id
    });
  }

  function onThumbnailClick(win) {
    win.show();
    win.focus();
    closeThumbnails();
    restoreView();
  }

  function setBounds(height) {
    if (thumbnailElement) {
      var thumbnailBounds = thumbnailElement.getBoundingClientRect();
      var left = Math.round(iconBounds.left + iconBounds.width / 2 - thumbnailBounds.width / 2);
      thumbnailElement.style.bottom = taskbarHeight + 10 + 'px';
      thumbnailElement.style.left = left + 'px';
      thumbnailElement.style.height = height + 30 + 'px';
    }
  }

  function init() {
    var thumbnails = getThumbnails();

    if (thumbnailElement) {
      appendChilds(thumbnailElement, thumbnails.map(function (t) {
        return t.container;
      }));
    }

    var thumbnailHeight = 0;
    thumbnails.forEach(function (t) {
      var bounds = t.thumbnail.getBoundingClientRect();
      t.container.style.width = bounds.width + 'px';
      t.container.style.height = bounds.height + 'px';

      if (bounds.height > thumbnailHeight) {
        thumbnailHeight = bounds.height;
      }
    });
    setBounds(thumbnailHeight);
  }

  if (firstInitTimeout) clearTimeout(firstInitTimeout);
  firstInitTimeout = setTimeout(function () {
    thumbnailElement = createElement('div', {
      className: 'taskbar-app-thumbnails flex',
      onmouseover: preventHidden,
      onmouseleave: hideThumbnail
    });
    document.body.appendChild(thumbnailElement);
    init();
  }, 500);
}
function preventHidden() {
  if (thumbnailHideTimeout) clearTimeout(thumbnailHideTimeout);
}
function hideThumbnail() {
  if (thumbnailHideTimeout) clearTimeout(thumbnailHideTimeout);
  thumbnailHideTimeout = setTimeout(function () {
    closeThumbnails();
  }, 500);
}
function closeThumbnails() {
  var _thumbnailElement;

  (_thumbnailElement = thumbnailElement) == null ? void 0 : _thumbnailElement.remove();
  thumbnailElement = undefined;
}

function getIconProps(icon, iconType) {
  var iconProps = Object.create(null);
  iconProps.className = 'taskbar-app-item-icon w-full h-full flex items-center content-center';

  if (iconType === 'svg') {
    iconProps.innerHTML = icon;
  } else {
    iconProps.className += ' image-icon';

    if (!iconProps.style) {
      iconProps.style = Object.create(null);
    }

    iconProps.style.backgroundImage = "url(\"" + icon + "\")";
    iconProps.style.pointerEvents = 'none';
  }

  return iconProps;
}

function TaskbarSystemAppItem(appInfo, events) {
  var appItem;
  var props = Object.create(null);
  props.title = appInfo.productName;
  props.className = 'taskbar-app-item';
  var iconProps = getIconProps(appInfo.icon, appInfo.iconType);

  props.onmousedown = function (e) {
    return e.stopImmediatePropagation();
  };

  props.onclick = events == null ? void 0 : events.onclick;
  appItem = createElement('div', props, createElement('div', iconProps));
  return {
    element: appItem
  };
}
function TaskbarAppItem(appInfo, events) {
  var appItem;
  var instances = [];
  var props = Object.create(null); // props.title = appInfo.productName

  props.className = 'taskbar-app-item';
  var iconProps = getIconProps(appInfo.icon, appInfo.iconType);

  props.onmousedown = function (e) {
    e.stopPropagation();
    triggerEvent(eventNames.closePopup);
  };

  props.onmouseover = function () {
    if (instances.length) {
      preventHidden();
      var wins = instances.map(function (t) {
        return t.app;
      });
      TaskBarAppThumbnails(wins, appItem.getBoundingClientRect());
    }
  };

  props.onmouseleave = function () {
    if (instances.length) {
      hideThumbnail();
    }
  };

  props.onclick = onAppItemClick;

  function onAppItemClick() {
    if (instances.length === 0) {
      // To Index
      createWindow(appInfo.name);
    } else if (instances.length === 1) {
      closeThumbnails();
      var currentInstance = instances[0];

      if (currentInstance.app.isVisible()) {
        if (currentInstance.app.isFocused()) {
          currentInstance.app.hide();
        } else {
          currentInstance.app.focus();
        }
      } else {
        currentInstance.app.show();
        currentInstance.app.focus();
      }
    }
  }

  var taskbarAppItemStatusElem;
  appItem = createElement('div', props, [createElement('div', iconProps), taskbarAppItemStatusElem = createElement('div', {
    className: 'taskbar-app-item-status'
  })]);

  function checkAppOpen() {
    if (instances.length) {
      taskbarAppItemStatusElem.classList.add('active');
    } else {
      taskbarAppItemStatusElem.classList.remove('active');
    }
  }

  function addInstance(id, win) {
    instances.push({
      name: id,
      active: true,
      app: win
    });
    checkAppOpen();
  }

  function removeInstance(id) {
    var instanceIndex = instances.findIndex(function (t) {
      return t.name === id;
    });

    if (instanceIndex > -1) {
      instances.splice(instanceIndex, 1);

      if (instances.length === 0) {
        if (events != null && events.onRemove) {
          events.onRemove();
        }
      }
    }

    checkAppOpen();
  }

  function setActive(_winId) {
    setTimeout(function () {
      appItem.classList.add('active');
    }, 0);
  }

  function removeActive(_windId) {
    setTimeout(function () {
      appItem.classList.remove('active');
    }, 0);
  }

  function getInstances() {
    return instances;
  }

  function remove() {
    appItem.remove();
  }

  return {
    element: appItem,
    addInstance: addInstance,
    removeInstance: removeInstance,
    getInstances: getInstances,
    setActive: setActive,
    removeActive: removeActive,
    remove: remove
  };
}

function Popup(options, content, events) {
  var id = 'popup' + generateID(32);
  var className = 'popup dropdown-box';
  var isShow = false;
  var style = {};

  if (options.className) {
    className += ' ' + options.className;
  }

  if (options.width) {
    style.width = options.width + 'px';
    style.height = options.height + 'px';
  }

  var popup = createElement('div');

  function createPopup(_content) {
    popup = createElement('div', {
      tabIndex: -1,
      className: className,
      style: style
    }, createElement('div', {
      className: 'popup-inner relative w-full h-full'
    }, _content));
    appendChild(document.body, popup); // To Index

    triggerEvent(eventNames.blurAllWindow);
    popup.focus();
    document.addEventListener('mousedown', onDocumentMouseDown1, false);
  }

  function show() {
    createPopup(content);
    isShow = true;

    if (events && events.onShow) {
      events.onShow();
    }
  }

  function close() {
    popup.remove();
    document.removeEventListener('mousedown', onDocumentMouseDown1, false);
    isShow = false;

    if (events && events.onHide) {
      events.onHide();
    }
  }

  function toggleShow() {
    isShow ? close() : show();
  }

  function onDocumentMouseDown1(e) {
    var target = e.target;

    if (!popup.contains(target)) {
      close();
    }
  }

  function hide() {
    if (popup) {
      popup.classList.add('hidden');
    }
  }

  function visible() {
    if (popup) {
      popup.classList.remove('hidden');
    }
  }

  listenEvent(eventNames.closePopup, id, function (triggerId) {
    if (isShow) {
      if (id !== triggerId) {
        close();
      }
    }
  });
  listenEvent(eventNames.showPopup, id, function () {
    visible();
  });
  listenEvent(eventNames.hidePopup, id, function () {
    hide();
  });
  return {
    element: popup,
    id: id,
    show: show,
    close: close,
    visible: visible,
    hide: hide,
    toggleShow: toggleShow
  };
}

/**
 * Calendar object
 */
var Calendar = /*#__PURE__*/function () {
  /**
   * Calendar constructor
   *
   * @param  options  Calendar options
   */
  function Calendar(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$startDate = _ref.startDate,
        startDate = _ref$startDate === void 0 ? null : _ref$startDate,
        _ref$endDate = _ref.endDate,
        endDate = _ref$endDate === void 0 ? null : _ref$endDate,
        _ref$siblingMonths = _ref.siblingMonths,
        siblingMonths = _ref$siblingMonths === void 0 ? false : _ref$siblingMonths,
        _ref$weekNumbers = _ref.weekNumbers,
        weekNumbers = _ref$weekNumbers === void 0 ? false : _ref$weekNumbers,
        _ref$weekStart = _ref.weekStart,
        weekStart = _ref$weekStart === void 0 ? 0 : _ref$weekStart;

    this.startDate = startDate;
    this.endDate = endDate;
    this.siblingMonths = siblingMonths;
    this.weekNumbers = weekNumbers;
    this.weekStart = weekStart;
  }
  /**
   * Calculate a calendar month
   *
   * @param   year   Year
   * @param   month  Month [0-11]
   * @return         Calendar days
   */


  var _proto = Calendar.prototype;

  _proto.getCalendar = function getCalendar(year, month) {
    var date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    year = date.getUTCFullYear();
    month = date.getUTCMonth();
    var calendar = [];
    var firstDay = date.getUTCDay();
    var firstDate = -((7 - this.weekStart + firstDay) % 7);
    var lastDate = Calendar.daysInMonth(year, month);
    var lastDay = (lastDate - firstDate) % 7;
    var lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1);
    var i = firstDate;
    var currentDay;
    var currentDate;
    var currentDateObject = false;
    var currentWeekNumber = null;
    var otherMonth;
    var otherYear;
    var max = lastDate - i + (lastDay !== 0 ? 7 - lastDay : 0) + firstDate;

    while (i < max) {
      currentDate = i + 1;
      currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;

      if (currentDate < 1 || currentDate > lastDate) {
        if (this.siblingMonths) {
          if (currentDate < 1) {
            otherMonth = month - 1;
            otherYear = year;

            if (otherMonth < 0) {
              otherMonth = 11;
              otherYear--;
            }

            currentDate = lastDatePreviousMonth + currentDate;
          } else if (currentDate > lastDate) {
            otherMonth = month + 1;
            otherYear = year;

            if (otherMonth > 11) {
              otherMonth = 0;
              otherYear++;
            }

            currentDate = i - lastDate + 1;
          }

          if (otherMonth !== undefined && otherYear !== undefined) {
            currentDateObject = {
              day: currentDate,
              weekDay: currentDay,
              month: otherMonth,
              year: otherYear,
              siblingMonth: true
            };
          }
        } else {
          currentDateObject = false;
        }
      } else {
        currentDateObject = {
          day: currentDate,
          weekDay: currentDay,
          month: month,
          year: year
        };
      }

      if (currentDateObject && this.weekNumbers) {
        if (currentWeekNumber === null) {
          currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
        } else if (currentDay === 1 && currentWeekNumber === 52) {
          currentWeekNumber = 1;
        } else if (currentDay === 1) {
          currentWeekNumber++;
        }

        currentDateObject.weekNumber = currentWeekNumber;
      }

      if (currentDateObject && this.startDate) {
        currentDateObject.selected = this.isDateSelected(currentDateObject);
      }

      calendar.push(currentDateObject);
      i++;
    }

    return calendar;
  }
  /**
   * Checks if a date is selected
   *
   * @param   date  Date object
   * @return        Selected status of the date
   */
  ;

  _proto.isDateSelected = function isDateSelected(date) {
    if (!this.startDate) {
      return false;
    }

    if (date.year === this.startDate.year && date.month === this.startDate.month && date.day === this.startDate.day) {
      return true;
    }

    if (!this.endDate) {
      return false;
    }

    if (date.year === this.startDate.year && date.month === this.startDate.month && date.day < this.startDate.day) {
      return false;
    }

    if (date.year === this.endDate.year && date.month === this.endDate.month && date.day > this.endDate.day) {
      return false;
    }

    if (date.year === this.startDate.year && date.month < this.startDate.month) {
      return false;
    }

    if (date.year === this.endDate.year && date.month > this.endDate.month) {
      return false;
    }

    if (date.year < this.startDate.year) {
      return false;
    }

    if (date.year > this.endDate.year) {
      return false;
    }

    return true;
  }
  /**
   * Sets the selected period start
   *
   * @param  date  Date object
   */
  ;

  _proto.setStartDate = function setStartDate(date) {
    this.startDate = date;
  }
  /**
   * Sets the selected period end
   *
   * @param  date  Date object
   */
  ;

  _proto.setEndDate = function setEndDate(date) {
    this.endDate = date;
  }
  /**
   * Sets one selected date
   *
   * @param  date  Date object
   */
  ;

  _proto.setDate = function setDate(date) {
    return this.setStartDate(date);
  }
  /**
   * Calculates the difference between two dates (date1 - date2), in days
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Days between the dates
   */
  ;

  Calendar.diff = function diff(dateLeft, dateRight) {
    var dateLeftDate = new Date(Date.UTC(dateLeft.year, dateLeft.month, dateLeft.day, 0, 0, 0, 0));
    var dateRightDate = new Date(Date.UTC(dateRight.year, dateRight.month, dateRight.day, 0, 0, 0, 0));
    return Math.ceil((dateLeftDate.getTime() - dateRightDate.getTime()) / 86400000);
  }
  /**
   * Calculates the interval between two dates
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Number of days between dates
   */
  ;

  Calendar.interval = function interval(dateLeft, dateRight) {
    return Math.abs(Calendar.diff(dateLeft, dateRight)) + 1;
  }
  /**
   * Quickly compare two dates
   *
   * @param   dateLeft   Left `CalendarDate` object
   * @param   dateRight  Right `CalendarDate` object
   * @return             Comparison result: -1 (left < right), 0 (equal) or 1 (left > right)
   */
  ;

  Calendar.compare = function compare(dateLeft, dateRight) {
    if (typeof dateLeft !== 'object' || typeof dateRight !== 'object' || dateLeft === null || dateRight === null) {
      throw new TypeError('dates must be objects');
    }

    if (dateLeft.year < dateRight.year) {
      return -1;
    }

    if (dateLeft.year > dateRight.year) {
      return 1;
    }

    if (dateLeft.month < dateRight.month) {
      return -1;
    }

    if (dateLeft.month > dateRight.month) {
      return 1;
    }

    if (dateLeft.day < dateRight.day) {
      return -1;
    }

    if (dateLeft.day > dateRight.day) {
      return 1;
    }

    return 0;
  }
  /**
   * Calculates the number of days in a month
   *
   * @param   year  Year
   * @param   month Month [0-11]
   * @return        Length of the month
   */
  ;

  Calendar.daysInMonth = function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  /**
   * Calculates if a given year is a leap year
   *
   * @param   year  Year
   * @return        Leap year or not
   */
  ;

  Calendar.isLeapYear = function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  /**
   * Calculates the week number for a given date
   *
   * @param   date  Date object
   * @return        Week number
   */
  // Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
  ;

  Calendar.calculateWeekNumber = function calculateWeekNumber(date) {
    // Creates the requested date
    var current = new Date(Date.UTC(date.year, date.month, date.day, 0, 0, 0, 0)); // Create a copy of the object

    var target = new Date(current.valueOf()); // ISO week date weeks start on monday so correct the day number

    var dayNr = (current.getUTCDay() + 6) % 7; // ISO 8601 states that week 1 is the week with the first thursday of that
    // year. Set the target date to the thursday in the target week.

    target.setUTCDate(target.getUTCDate() - dayNr + 3); // Store the millisecond value of the target date

    var firstThursday = target.valueOf(); // Set the target to the first thursday of the year
    // First set the target to january first

    target.setUTCMonth(0, 1); // Not a thursday? Correct the date to the next thursday

    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + (4 - target.getUTCDay() + 7) % 7);
    } // The week number is the number of weeks between the  first thursday of the
    // year and the thursday in the target week.
    // 604800000 = 7 * 24 * 3600 * 1000


    return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  };

  return Calendar;
}();

function Calendar$1() {
  var calendarMonthElem, calendarItemsElem;

  function onShow() {
    calendarItemsElem.innerHTML = '';
    var calendar = new Calendar({
      siblingMonths: true
    });
    var today = new Date();
    calendarMonthElem.innerHTML = longMonthNames[today.getUTCMonth()];
    var days = shortDayNames.map(function (t) {
      return t.substring(0, 2);
    });

    for (var index = 0; index < days.length; index++) {
      var dayName = days[index];
      calendarItemsElem.appendChild(createElement('div', {
        className: 'calendar-day -weekday'
      }, createElement('div', {
        className: 'w-full h-full flex items-center content-center'
      }, dayName)));
    }

    calendar.getCalendar(today.getUTCFullYear(), today.getUTCMonth()).forEach(function (date) {
      var div = createElement('div', {
        className: 'calendar-day' + (date && date.siblingMonth ? ' -sibling-month' : '')
      }, createElement('div', {
        className: 'calendar-day-inner w-full h-full flex items-center content-center' + (date && today.getDate() === date.day && !date.siblingMonth ? ' active' : '')
      }, date ? date.day.toString() : ''));
      calendarItemsElem.appendChild(div);
    });
  }

  return Popup({
    className: 'calendar-popup'
  }, createElement('div', {
    className: 'calendar-content'
  }, [calendarMonthElem = createElement('div', {
    className: 'calendar-month'
  }), calendarItemsElem = createElement('div', {
    className: 'calendar-items'
  })]), {
    onShow: onShow
  });
}

var calendar = /*#__PURE__*/Calendar$1();

function formatDate(date) {
  return dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function TaskBarDate() {
  function onclick() {
    triggerEvent(eventNames.closePopup, calendar.id);
    calendar.toggleShow();
  }

  var taskbarDate = createElement('div', {
    className: 'taskbar-item taskbar-date-time taskbar-date h-full flex items-center flex-shrink-0',
    onclick: onclick,
    onmousedown: function onmousedown(e) {
      return e.stopPropagation();
    }
  }, formatDate(new Date()));
  setInterval(function () {
    taskbarDate.textContent = formatDate(new Date());
  }, 500);
  return {
    element: taskbarDate
  };
}

function formatAMPM(date, showSecond) {
  if (showSecond === void 0) {
    showSecond = false;
  }

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var strTime = hours + ':' + minutes + (showSecond ? ':' + seconds : '') + ' ' + ampm;
  return strTime;
}

function Clock() {
  var secondHand, minsHand, hourHand, clockTime;
  var intervalId;

  function setDate() {
    var now = new Date();
    var seconds = now.getSeconds();
    var secondsDegrees = seconds / 60 * 360 + 90;
    secondHand.style.transform = "rotate(" + secondsDegrees + "deg)";
    var mins = now.getMinutes();
    var minsDegrees = mins / 60 * 360 + seconds / 60 * 6 + 90;
    minsHand.style.transform = "rotate(" + minsDegrees + "deg)";
    var hour = now.getHours();
    var hourDegrees = hour / 12 * 360 + mins / 60 * 30 + 90;
    hourHand.style.transform = "rotate(" + hourDegrees + "deg)";
    clockTime.textContent = formatAMPM(now, true);
  }

  function onShow() {
    setDate();
    setInterval(setDate, 500);
  }

  function onHide() {
    clearInterval(intervalId);
  }

  return Popup({
    className: 'clock-popup'
  }, createElement('div', {
    className: 'clock-container flex'
  }, [createElement('div', {
    className: 'clock-inner'
  }, [createElement('div', {
    className: 'clock'
  }, [createElement('div', {
    className: 'outer-clock-face'
  }, [createElement('div', {
    className: 'clock-marking clock-marking-one'
  }), createElement('div', {
    className: 'clock-marking clock-marking-two'
  }), createElement('div', {
    className: 'clock-marking clock-marking-three'
  }), createElement('div', {
    className: 'clock-marking clock-marking-four'
  }), createElement('div', {
    className: 'inner-clock-face'
  }, [hourHand = createElement('div', {
    className: 'clock-hand clock-hour-hand'
  }), minsHand = createElement('div', {
    className: 'clock-hand clock-min-hand'
  }), secondHand = createElement('div', {
    className: 'clock-hand clock-second-hand'
  })])])]), clockTime = createElement('div', {
    className: 'clock-time'
  })]), createElement('div', {
    className: 'clock-divider'
  }), createElement('div', {
    className: 'alarm-container flex flex-col flex-1 w-full'
  }, [createElement('div', {
    className: 'alarm-heading'
  }, 'Alarms'), createElement('div', {
    className: 'alarm-items flex items-center content-center flex-1'
  }, 'No alarms')])]), {
    onShow: onShow,
    onHide: onHide
  });
}

var clock = /*#__PURE__*/Clock();

function TaskBarTime() {
  var taskbarTime = createElement('div', {
    className: 'taskbar-item taskbar-date-time taskbar-time h-full flex items-center',
    onclick: function onclick() {
      triggerEvent(eventNames.closePopup, clock.id);
      clock.toggleShow();
    },
    onmousedown: function onmousedown(e) {
      return e.stopPropagation();
    }
  }, formatAMPM(new Date()));
  setInterval(function () {
    taskbarTime.textContent = formatAMPM(new Date());
  }, 500);
  return {
    element: taskbarTime
  };
}

function DesktopScreen() {
  var _getState = getState('nightlight'),
      nightlight = _getState.nightlight;

  var screenBrightOverlayElem;
  var screenNightlightElem;
  var screenElem = createElement('div', {
    className: 'screen'
  }, [screenBrightOverlayElem = createElement('div', {
    className: 'screen-bright-overlay w-full h-full'
  }), screenNightlightElem = createElement('div', {
    className: 'screen-nightlight w-full h-full' + (nightlight ? ' active' : '')
  })]);
  appendChild(document.body, screenElem);

  function setBrightness(percent) {
    var value = round(0.7 - percent / 100 * 0.7, 2);
    screenBrightOverlayElem.style.opacity = value.toString();
    triggerEvent(eventNames.brightnessChange, percent);
  }

  function setNightLight(enabled) {
    nightlight = enabled;
    screenNightlightElem.classList[nightlight ? 'add' : 'remove']('active');
    setState({
      nightlight: nightlight
    });
    triggerEvent(eventNames.nightLightChange, nightlight);
  }

  function toogleNightLight() {
    setNightLight(!nightlight);
  }

  return {
    setBrightness: setBrightness,
    setNightLight: setNightLight,
    toogleNightLight: toogleNightLight
  };
}

var DesktopScreen$1 = /*#__PURE__*/DesktopScreen();

function Slider(options) {
  var lastPercent;
  var slider, sliderInner, sliderThumbPrimary, sliderThumbSecondary, sliderThumbSecondaryText;
  var sliderMouseDown = false,
      sliderBounds = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };

  function getSliderBounds() {
    sliderBounds = sliderInner.getBoundingClientRect();
  }

  function getPercent(x, cb) {
    var currentWidth = x - sliderBounds.left;

    if (currentWidth < 0) {
      currentWidth = 0;
    } else if (currentWidth > sliderBounds.width) {
      currentWidth = sliderBounds.width;
    }

    var percent = currentWidth / sliderBounds.width * 100;
    cb(percent);
  }

  function _onChange(x) {
    if (typeof x !== 'number') return;
    getPercent(x, function (percent) {
      lastPercent = percent;
      sliderThumbPrimary.style.width = percent + '%';
      sliderThumbSecondary.style.width = percent + '%';

      if (typeof options.onChange === 'function') {
        options.onChange(percent, function (value) {
          if (options.showBagde) {
            sliderThumbSecondaryText.textContent = value.toString();
          }
        });
      } else {
        if (options.showBagde) {
          sliderThumbSecondaryText.textContent = Math.round(percent).toString();
        }
      }
    });
  }

  function onMouseDown(e) {
    sliderMouseDown = true;
    slider.classList.add('hoding');
    getSliderBounds();

    _onChange(e.x);

    if (typeof options.onHoding === 'function') {
      options.onHoding();
    }

    document.addEventListener('mousemove', onDocumnetMouseMove, false);
    document.addEventListener('mouseup', onDocumnetMouseUp, false);
  }

  function onDocumnetMouseMove(e) {
    if (!sliderMouseDown) return;

    _onChange(e.x);
  }

  function onDocumnetMouseUp() {
    sliderMouseDown = false;
    slider.classList.remove('hoding');

    if (typeof options.onRelease === 'function') {
      options.onRelease(lastPercent);
    }

    document.removeEventListener('mousemove', onDocumnetMouseMove, false);
    document.removeEventListener('mouseup', onDocumnetMouseUp, false);
  }

  function onMouseOver() {
    getSliderBounds();
  }

  function onMouseMove(e) {
    if (sliderMouseDown) return;
    getPercent(e.x, function (percent) {
      if (!percent) percent = 0;
      sliderThumbSecondary.style.width = percent + '%';

      if (typeof options.onHoverMove === 'function') {
        options.onHoverMove(percent, function (value) {
          if (options.showBagde) {
            sliderThumbSecondaryText.textContent = value.toString();
          }
        });
      } else {
        if (options.showBagde) {
          sliderThumbSecondaryText.textContent = Math.round(percent).toString();
        }
      }
    });
  }

  function onMouseLeave() {
    sliderThumbSecondary.style.width = '0%';
  }

  slider = createElement('div', {
    className: 'slider',
    onmousedown: onMouseDown,
    onmouseover: onMouseOver,
    onmousemove: onMouseMove,
    onmouseleave: onMouseLeave
  }, sliderInner = createElement('div', {
    className: 'slider-inner'
  }, [sliderThumbPrimary = createElement('div', {
    className: 'slider-thumb-primary'
  }, createElement('div', {
    className: 'slider-thumb-primary-inner'
  })), sliderThumbSecondary = createElement('div', {
    className: 'slider-thumb-secondary'
  }, createElement('div', {
    className: 'slider-thumb-secondary-inner'
  }, options.showBagde ? sliderThumbSecondaryText = createElement('div', {
    className: 'slider-thumb-secondary-text'
  }) : null))]));

  function update(percent) {
    if (percent > 100) percent = 100;

    if (!sliderMouseDown) {
      sliderThumbPrimary.style.width = percent + '%';
    }
  }

  return {
    element: slider,
    update: update
  };
}

function ActionCenterButton(options) {
  var _active = options.active;
  var buttonElem = createElement('div', {
    className: 'action-center-button' + (_active ? ' active' : '')
  }, [createElement('div', {
    className: 'action-center-button-icon',
    innerHTML: options.icon,
    onclick: onclick
  }), createElement('div', {
    className: 'action-center-button-text'
  }, options.text)]);

  function onclick() {
    if (options.disableActiveOnClick) return;
    _active = !_active;

    if (typeof options.onclick === 'function') {
      options.onclick();
    }
  }

  function _setActive(active) {
    buttonElem.classList[active ? 'add' : 'remove']('active');
  }

  function setActive(active) {
    _active = active;

    _setActive(active);
  }

  return {
    element: buttonElem,
    setActive: setActive
  };
}

function ActionCenter() {
  var _getState = getState(['darktheme', 'nightlight', 'brightness', 'volume', 'transparency']),
      darktheme = _getState.darktheme,
      nightlight = _getState.nightlight,
      brightness = _getState.brightness,
      volume = _getState.volume,
      transparency = _getState.transparency;

  var wifiButton = ActionCenterButton({
    icon: wifiIcon,
    text: 'Wifi'
  });
  var bluetoothButton = ActionCenterButton({
    icon: bluetoothIcon,
    text: 'Bluetooth'
  });
  var airPlaneModeButton = ActionCenterButton({
    icon: airplaneModeIcon,
    text: 'Airplan Mode'
  });
  var darkThemeButton = ActionCenterButton({
    active: darktheme,
    icon: darkThemeIcon,
    text: 'Dark Theme',
    onclick: function onclick() {
      toggleTheme();
    }
  });
  var focusAssistButton = ActionCenterButton({
    icon: moonIcon,
    text: 'Focus Assist'
  });
  var locationButton = ActionCenterButton({
    icon: locationIcon,
    text: 'Location'
  });
  var nightLightButton = ActionCenterButton({
    active: nightlight,
    icon: nightLightIcon,
    text: 'Night Light',
    onclick: function onclick() {
      DesktopScreen$1.toogleNightLight();
    }
  });
  var connectButton = ActionCenterButton({
    icon: castIcon,
    text: 'Connect'
  }); // const projectButton = ActionCenterButton({
  //   icon: projectIcon,
  //   text: 'Project'
  // })

  var transparencyButton = ActionCenterButton({
    active: transparency,
    icon: transparencyIcon,
    text: 'Transparency',
    onclick: function onclick() {
      toggleTransparency();
    }
  });
  listenEvent(eventNames.themeChange, 'actionCenter', function (darkTheme) {
    darkThemeButton.setActive(darkTheme);
  });
  var brightnessCaptured = false;
  var brightnessSlider = Slider({
    showBagde: true,
    onHoding: function onHoding() {
      brightnessCaptured = true;
    },
    onChange: function onChange(percent, cb) {
      DesktopScreen$1.setBrightness(percent);
      cb(Math.round(percent));
    },
    onRelease: function onRelease(value) {
      brightnessCaptured = false;
      setState({
        brightness: Math.round(value)
      });
    }
  });
  brightnessSlider.update(brightness || 100);
  var volumeSlider = Slider({
    showBagde: true,
    onRelease: function onRelease(percent) {
      setState({
        volume: Math.round(percent)
      });
    }
  });
  volumeSlider.update(volume);
  listenEvent(eventNames.nightLightChange, 'actionCenter', function (nightlight) {
    nightLightButton.setActive(nightlight);
  });
  listenEvent(eventNames.brightnessChange, 'actionCenter', function (percent) {
    if (!brightnessCaptured) {
      brightnessSlider.update(percent);
    }
  });
  listenEvent(eventNames.transparentChange, 'actionCenter', function (enabled) {
    transparencyButton.setActive(enabled);
  });
  return Popup({
    className: 'action-center'
  }, [createElement('div', {
    className: 'action-center-buttons'
  }, [wifiButton.element, bluetoothButton.element, airPlaneModeButton.element, darkThemeButton.element, focusAssistButton.element, locationButton.element, nightLightButton.element, connectButton.element, // projectButton.element,
  transparencyButton.element]), createElement('div', {
    className: 'action-center-sliders'
  }, [createElement('div', {
    className: 'action-center-slider w-full flex items-center'
  }, [createElement('div', {
    className: 'action-center-slider-icon',
    innerHTML: sunIcon
  }), brightnessSlider.element]), createElement('div', {
    className: 'action-center-slider w-full flex items-center'
  }, [createElement('div', {
    className: 'action-center-slider-icon',
    innerHTML: volumeIcon2
  }), volumeSlider.element])])]);
}

var ActionCenter$1 = /*#__PURE__*/ActionCenter();

function AllApps(onBackButtonClick, onAppItemClick) {
  var groupApps = AppInfoGroup();
  var container = createElement('div', {
    className: 'start-menu-apps-list-container w-full h-full flex flex-col'
  }, [createElement('div', {
    className: 'start-menu-apps-list-heading flex items-center flex-shrink-0'
  }, [createElement('div', {
    className: 'start-menu-label',
    style: {
      paddingLeft: '20px'
    }
  }, 'All apps'), createElement('div', {
    className: 'start-menu-button flex content-center items-center',
    onclick: onBackButtonClick
  }, [createElement('div', {
    className: 'start-menu-button-icon h-full flex content-center items-center',
    innerHTML: chevronLeftIcon
  }), createElement('div', {
    className: 'start-menu-button-text'
  }, 'Back')])]), createElement('div', {
    className: 'start-menu-apps-list w-full h-full'
  }, Object.keys(groupApps).map(function (letter, index) {
    return createElement('div', {
      key: 'app-item' + index,
      className: 'start-menu-apps-list-section'
    }, [createElement('div', {
      className: 'start-menu-apps-list-label flex items-center'
    }, letter), createElement('div', {
      className: 'start-menu-apps-list-items'
    }, groupApps[letter].map(function (app, index2) {
      return createElement('div', {
        key: 'app-item' + index2,
        className: 'start-menu-apps-list-item flex items-center',
        onclick: onAppItemClick.bind(null, app)
      }, [createElement('div', {
        className: 'start-menu-apps-list-item-icon flex-shrink-0',
        style: {
          backgroundImage: "url(" + app.icon + ")"
        }
      }), createElement('div', {
        className: 'start-menu-apps-list-item-name'
      }, createElement('div', {
        className: 'text-ellipsis'
      }, app.productName))]);
    }))]);
  }))]);
  return container;
}

function StartMenu(options) {
  var startMenu;
  var contentHome;
  var startMenuContent;

  function onItemClick(app) {
    startMenu.toggleShow();
    createWindow(app.name);
  }

  var allApps;

  function onAllAppButtonClick() {
    if (allApps) {
      allApps.remove();
      allApps = undefined;
    }

    allApps = AllApps(onBackButtonClick, onItemClick);
    contentHome.classList.add('slide-left');
    startMenuContent.appendChild(allApps);
    setTimeout(function () {
      if (allApps) {
        allApps.style.transform = 'translateX(0)';
      }
    }, 0);
  }

  function onBackButtonClick() {
    contentHome.classList.remove('slide-left');
    setTimeout(function () {
      if (allApps) {
        allApps.style.transform = 'translateX(100%)';
      }
    }, 0);
  }

  function onHide() {
    contentHome.classList.remove('slide-left');
    setTimeout(function () {
      if (allApps) {
        allApps.style.transform = 'translateX(100%)';
        setTimeout(function () {
          var _allApps;

          (_allApps = allApps) == null ? void 0 : _allApps.remove();
          allApps = undefined;
        }, 300);
      }
    }, 0);
  }

  var appList = function appList() {
    return Object.keys(AppInfo).filter(function (key) {
      return AppInfo[key].name !== 'settings';
    }).map(function (key) {
      var currentApp = AppInfo[key];
      return createElement('div', {
        className: 'start-menu-pinned-apps-item flex flex-col items-center',
        onclick: onItemClick.bind(null, currentApp)
      }, [createElement('div', {
        className: 'start-menu-pinned-apps-item-icon',
        style: {
          backgroundImage: "url(\"" + currentApp.icon + "\")"
        }
      }), createElement('div', {
        className: 'start-menu-pinned-apps-item-label w-full'
      }, createElement('div', {
        title: currentApp.productName,
        className: 'start-menu-pinned-apps-item-label-content text-ellipsis'
      }, currentApp.productName))]);
    });
  };

  var recommendedApps = ['mail', 'github', 'twitter', 'vscode', 'terminal', 'spotify'].map(function (appName) {
    return AppInfo[appName];
  });

  var recommendedList = function recommendedList() {
    return recommendedApps.map(function (app) {
      return createElement('div', {
        className: 'start-menu-recommended-apps-item flex items-center',
        onclick: onItemClick.bind(null, app)
      }, [createElement('div', {
        className: 'start-menu-recommended-apps-item-icon flex-shrink-0',
        style: {
          backgroundImage: "url(\"" + app.icon + "\")"
        }
      }), createElement('div', {
        className: 'start-menu-recommended-apps-item-label w-full'
      }, createElement('div', {
        title: app.productName,
        className: 'start-menu-recommended-apps-item-label-content text-ellipsis'
      }, app.productName))]);
    });
  };

  startMenu = Popup({
    width: (options == null ? void 0 : options.width) || 520,
    height: (options == null ? void 0 : options.height) || 540,
    className: 'start-menu'
  }, createElement('div', {
    className: 'w-full h-full flex flex-col'
  }, [startMenuContent = createElement('div', {
    className: 'start-menu-content flex flex-col w-full h-full'
  }, [//Content Home
  contentHome = createElement('div', {
    className: 'w-full h-full start-menu-content-home p-30 flex flex-col'
  }, [createElement('div', {
    className: 'start-menu-pinned-apps flex-1'
  }, [createElement('div', {
    className: 'start-menu-heading flex items-center'
  }, [createElement('div', {
    className: 'start-menu-label'
  }, 'Pinned'), createElement('div', {
    className: 'start-menu-button flex content-center items-center',
    onclick: onAllAppButtonClick
  }, [createElement('div', {
    className: 'start-menu-button-text'
  }, 'All apps'), createElement('div', {
    className: 'start-menu-button-icon h-full flex content-center items-center',
    innerHTML: chevronRightIcon
  })])]), createElement('div', {
    className: 'start-menu-pinned-apps-list'
  }, appList())]), createElement('div', {
    className: 'start-menu-recommended flex flex-col flex-1'
  }, [createElement('div', {
    className: 'start-menu-heading flex'
  }, [createElement('div', {
    className: 'start-menu-label'
  }, 'Recommended')]), createElement('div', {
    className: 'start-menu-recommended-apps-list h-full'
  }, recommendedList())])])]), createElement('div', {
    className: 'start-menu-footer flex-shrink-0 flex items-center'
  }, [createElement('div', {
    className: 'start-menu-user flex items-center'
  }, [createElement('div', {
    className: 'start-menu-user-icon',
    style: {
      backgroundImage: "url(\"imgs/user.gif\")"
    }
  }), createElement('div', {
    className: 'start-menu-user-name'
  }, 'chrishtu')]), createElement('div', {
    className: 'start-menu-footer-right flex'
  }, [createElement('div', {
    className: 'start-menu-footer-button start-menu-power',
    innerHTML: powerIcon
  }), createElement('div', {
    className: 'start-menu-footer-button',
    innerHTML: settingIcon,
    onclick: function onclick() {
      createWindow('settings');
      startMenu.toggleShow();
    }
  })])])]), {
    onHide: onHide
  });
  return startMenu;
}

var startMenu = /*#__PURE__*/StartMenu();

function onmouseover() {
  //To Window Manager
  triggerEvent(eventNames.showDesktopHover);
}

function onmouseout() {
  //To Window Manager
  triggerEvent(eventNames.showDesktopOut);
}

function showDesktop() {
  //To Window Manager
  triggerEvent(eventNames.showDesktop);
}

function TaskbarSystemApp() {
  function onStartMenuAppItemClick() {
    triggerEvent(eventNames.closePopup, startMenu.id);
    startMenu.toggleShow();
  }

  var taskbarSystemAppItems = [{
    name: 'startMenu',
    item: TaskbarSystemAppItem({
      isSystemApp: true,
      name: 'start-menu',
      productName: 'Start',
      icon: windowIcon,
      iconType: 'svg'
    }, {
      onclick: onStartMenuAppItemClick
    })
  }];
  var taskbarSystemAppItemsElem = taskbarSystemAppItems.map(function (t) {
    return t.item.element;
  });
  return createElement('div', {
    className: 'taskbar-app-items h-full flex flex-shrink-0 items-center content-center'
  }, taskbarSystemAppItemsElem);
}

function TaskbarAppItems() {
  var taskbarAppItems = [];
  var savedItems = localStorage.getItem('taskbarItems');

  if (typeof savedItems === 'undefined' || savedItems === null) {
    taskbarAppItems = [{
      name: 'explorer',
      item: TaskbarAppItem(AppInfo.explorer, {
        onRemove: onAppItemInstanceRemove
      }),
      pinned: true
    }, {
      name: 'settings',
      item: TaskbarAppItem(AppInfo.settings, {
        onRemove: onAppItemInstanceRemove
      }),
      pinned: true
    }, {
      name: 'notepad',
      item: TaskbarAppItem(AppInfo.notepad, {
        onRemove: onAppItemInstanceRemove
      }),
      pinned: true
    }];
  } else {
    try {
      if (savedItems) {
        savedItems = JSON.parse(savedItems);

        if (savedItems instanceof Array) {
          taskbarAppItems = savedItems.map(function (itemName) {
            return {
              name: itemName,
              item: TaskbarAppItem(AppInfo[itemName], {
                onRemove: onAppItemInstanceRemove
              }),
              pinned: true
            };
          });
        }
      }
    } catch (_error) {}
  }

  var taskbarAppItemsElem; // let lastActiveApp: string

  var taskbarAppItemsContainerElem = createElement('div', {
    className: 'w-full h-full flex content-center'
  }, [// System
  TaskbarSystemApp(), // Apps
  taskbarAppItemsElem = createElement('div', {
    className: 'taskbar-app-items h-full flex items-center content-center'
  }, taskbarAppItems.map(function (t) {
    return t.item.element;
  }))]);

  function onAppItemInstanceRemove() {}

  function getItemByName(appName) {
    return taskbarAppItems.find(function (t) {
      return t.name === appName;
    });
  }

  function addItem(appName, appItem) {
    var item = {
      name: appName,
      item: appItem
    };
    taskbarAppItems.push(item);
    taskbarAppItemsElem.appendChild(appItem.element);
    return item;
  }

  function removeAppItem(appName) {
    taskbarAppItems = taskbarAppItems.filter(function (t) {
      return t.name !== appName;
    });
  }

  function _addInstance(appItem, id, win) {
    if (appItem.item.addInstance) {
      appItem.item.addInstance(id, win);
    }
  }

  function addInstance(appName, id, win) {
    var appItem = getItemByName(appName);

    if (!appItem) {
      var newTaskbarAppItem = TaskbarAppItem(AppInfo[appName]);
      var newInstance = addItem(appName, newTaskbarAppItem);

      _addInstance(newInstance, id, win);

      taskbarAppItems.push({
        name: appName,
        item: newTaskbarAppItem
      });
    } else {
      _addInstance(appItem, id, win);
    }
  }

  function removeInstance(appName, id) {
    var appItem = getItemByName(appName);

    if (appItem) {
      appItem.item.removeInstance(id);

      if (!appItem.item.getInstances().length) {
        if (!appItem.pinned) {
          appItem.item.remove();
          removeAppItem(appName);
        } else {
          appItem.item.removeActive(id);
        }
      }
    }
  }

  function setActiveWindow(appName, id) {
    var appItem = getItemByName(appName);

    if (appItem) {
      appItem.item.setActive(id);
    }
  }

  function removeActiveWindow(appName, id) {
    var appItem = getItemByName(appName);

    if (appItem) {
      appItem.item.removeActive(id);
    }
  }

  function getAppItemBounds(appName) {
    var appItem = getItemByName(appName);
    return appItem.item.element.getBoundingClientRect();
  }

  return {
    element: taskbarAppItemsContainerElem,
    addInstance: addInstance,
    removeAppItem: removeAppItem,
    removeInstance: removeInstance,
    setActiveWindow: setActiveWindow,
    removeActiveWindow: removeActiveWindow,
    getAppItemBounds: getAppItemBounds
  };
}

function _Taskbar() {
  var taskbarAppItems = TaskbarAppItems();
  var taskbar = createElement('div', {
    className: 'taskbar fixed bottom w-full',
    style: {
      height: taskbarHeight + 'px'
    }
  }, createElement('div', {
    className: 'taskbar-innner flex h-full'
  }, [createElement('div', {
    className: 'taskbar-left h-full flex-1 flex-shrink-0 flex items-center'
  }, [TaskBarTime().element]), createElement('div', {
    className: 'taskbar-center flex-2 w-full h-full'
  }, taskbarAppItems.element), createElement('div', {
    className: 'taskbar-right h-full flex-1 flex-shrink-0 relative flex items-center content-end',
    style: {
      paddingRight: '6px'
    }
  }, [createElement('div', {
    title: 'Show hidden icons',
    className: 'taskbar-item flex items-center content-center flex-shrink-0 taskbar-item-more',
    innerHTML: chevronUpIcon
  }), createElement('div', {
    className: 'taskbar-item flex items-center content-center flex-shrink-0',
    onmousedown: function onmousedown(e) {
      return e.stopPropagation();
    },
    onclick: function onclick() {
      triggerEvent(eventNames.closePopup, ActionCenter$1.id);
      ActionCenter$1.toggleShow();
    }
  }, [createElement('div', {
    className: 'flex items-center content-center h-full flex-shrink-0',
    style: {
      width: taskbarHeight + 'px'
    },
    innerHTML: volumeIcon2
  }), createElement('div', {
    className: 'flex items-center content-center h-full flex-shrink-0',
    style: {
      width: taskbarHeight + 'px'
    },
    innerHTML: wifiIcon
  }), createElement('div', {
    className: 'flex items-center content-center h-full flex-shrink-0',
    style: {
      width: taskbarHeight + 'px'
    },
    innerHTML: batteryIcon
  })]), TaskBarDate().element, createElement('div', {
    className: 'show-desktop flex-shrink-0',
    onmouseover: onmouseover,
    onmouseout: onmouseout,
    onclick: showDesktop
  })])]));
  appendChild(document.body, taskbar);
  return taskbarAppItems;
}

var Taskbar = /*#__PURE__*/_Taskbar();

var windows = [];
var focusedWindows = [];
var visibleWindows = [];
var isShowDesktop = false;

function removeVisibleWindow(id) {
  var winInfoIndex = visibleWindows.findIndex(function (t) {
    return t.window.id === id;
  });

  if (winInfoIndex > -1) {
    visibleWindows.splice(winInfoIndex, 1);
  }
}

function addFocusedWindow(win) {
  var winIndex = focusedWindows.findIndex(function (t) {
    return t.id === win.id;
  });

  if (winIndex > -1) {
    focusedWindows.splice(winIndex, 1);
  }

  focusedWindows.push(win);
}

function removeFocusedWindow(id) {
  var winIndex = focusedWindows.findIndex(function (t) {
    return t.id === id;
  });

  if (winIndex > -1) {
    focusedWindows.splice(winIndex, 1);

    if (focusedWindows.length > 0) {
      var lastActiveApp = focusedWindows[focusedWindows.length - 1];

      if (lastActiveApp.isVisible()) {
        lastActiveApp.focus();
      }
    }
  }
}

function loopWindows(cb) {
  var winLen = windows.length;

  for (var index = 0; index < winLen; index++) {
    cb(windows[index]);
  }
}

function getWindowByName(appName) {
  return windows.find(function (t) {
    return t.appName === appName;
  });
}
function addWindow(appName, id, win) {
  isShowDesktop = false;
  var winLen = windows.length;

  for (var index = 0; index < winLen; index++) {
    var curWinInfo = windows[index];
    curWinInfo.window.decrementZIndex();
    curWinInfo.window.blur();
  }

  windows.push({
    appName: appName,
    id: id,
    window: win
  });
  Taskbar.addInstance(appName, id, win);
}
function removeWindow(appName, id) {
  var windowIndex = windows.findIndex(function (t) {
    return t.id === id;
  });

  if (windowIndex > -1) {
    windows.splice(windowIndex, 1);
    Taskbar.removeInstance(appName, id);
  }

  removeFocusedWindow(id);
  removeVisibleWindow(id);
}
function focus(_appName, id, win) {
  win.restoreZIndex();
  addFocusedWindow(win);
  var winLen = windows.length;

  for (var index = 0; index < winLen; index++) {
    var curWin = windows[index];

    if (curWin.id !== id) {
      curWin.window.decrementZIndex();
      curWin.window.blur();
    }
  }
}
function viewWindow(id) {
  var winLen = windows.length;

  for (var index = 0; index < winLen; index++) {
    var curWin = windows[index];

    if (curWin.id !== id) {
      if (curWin.window.isVisible()) {
        curWin.window.makeTransparent();
      }
    } else {
      curWin.window.element.classList.add('top-view');
    }
  }
}
function restoreView(id) {
  if (id) {
    var winLen = windows.length;

    for (var index = 0; index < winLen; index++) {
      var curWin = windows[index];

      if (curWin.id !== id) {
        if (curWin.window.isVisible()) {
          curWin.window.removeTransparent();
        }
      } else {
        curWin.window.element.classList.remove('top-view');
      }
    }
  } else {
    var _winLen = windows.length;

    for (var _index = 0; _index < _winLen; _index++) {
      var _curWin = windows[_index];

      if (_curWin.window.isVisible()) {
        _curWin.window.removeTransparent();
      }
    }
  }
}
function blurAll() {
  loopWindows(function (winInfo) {
    winInfo.window.blur();
  });
}
window.addEventListener('resize', function () {
  var winLen = windows.length;

  for (var index = 0; index < winLen; index++) {
    var curWin = windows[index];

    if (curWin.window.isMaximized()) {
      curWin.window.maximize();
    }
  }
}, false);

function showDesktop$1() {
  if (!isShowDesktop) {
    visibleWindows = windows.filter(function (win) {
      return win.window.isVisible();
    });
    visibleWindows.forEach(function (win) {
      win.window.removeTransparent();
      win.window.hide();
    });
  } else {
    visibleWindows.forEach(function (win) {
      win.window.removeTransparent();
      win.window.show();
    });
    var lastFocusWindow = focusedWindows[focusedWindows.length - 1];

    if (lastFocusWindow) {
      if (lastFocusWindow.isVisible()) {
        lastFocusWindow.focus();
      }
    }
  }

  isShowDesktop = !isShowDesktop;
} //From Taskbar Thumbnail


listenEvent(eventNames.viewWindow, 'window-manager', function (data) {
  viewWindow(data.id);
});
listenEvent(eventNames.restoreView, 'window-manager', function (data) {
  restoreView(data.id);
});
listenEvent(eventNames.showDesktopHover, 'window-manager', function () {
  loopWindows(function (winInfo) {
    if (winInfo.window.isVisible()) {
      winInfo.window.makeTransparent();
    }
  });
});
listenEvent(eventNames.showDesktopOut, 'window-manager', function () {
  loopWindows(function (winInfo) {
    if (winInfo.window.isVisible()) {
      winInfo.window.removeTransparent();
    }
  });
});
listenEvent(eventNames.showDesktop, 'window-manager', function () {
  showDesktop$1();
});
listenEvent(eventNames.blurAllWindow, 'window-manager', function () {
  blurAll();
});

var maxZIndex = 100000;
function Window(options) {
  var listeners = {};

  if (options.singleInstance) {
    var instance = getWindowByName(options.name);

    if (instance) {
      instance.window.executeListeners('secondInstance', options.args);
      return instance.window;
    }
  }

  var windowInfo;
  var zIndex = maxZIndex;
  var id = generateID(32); // let windowInner: HTMLDivElement

  var windowContent;
  var isTransparent = false;
  var maximized = false;
  var minimized = false;
  var focused = false;
  var isShow = false;
  var isFullScreen = false;
  var dragTop = false;
  var _autoHideTitleBar = false;
  var resizeHanders;

  function addEventListener(name, listener) {
    if (!listeners[name]) {
      listeners[name] = [];
    }

    listeners[name].push(listener);
  }

  function executeListeners(name, args) {
    var currentListeners = listeners[name];
    if (!currentListeners) return;

    for (var index = 0; index < currentListeners.length; index++) {
      currentListeners[index](args);
    }
  }

  var title = options.title || '';
  var titlebar = TitleBar({
    icon: options.icon,
    title: options.title,
    disableMaximize: options.disableMaximize,
    maximized: options.maximized,
    autoHide: options.autoHideTitleBar
  }, {
    onDoubleClick: onDoubleClick,
    onMinimizeButtonClick: onMinimizeButtonClick,
    onMaximizeButtonClick: onMaximizeButtonClick,
    onCloseButtonClick: onCloseButtonClick,
    onVisible: function onVisible() {
      return executeListeners('ontitlebarshow');
    },
    onHidden: function onHidden() {
      return executeListeners('ontitlebarhide');
    }
  });
  var lastBounds = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  var style = {
    zIndex: zIndex.toString()
  };
  var _top = 0,
      _left = 0,
      _width = 300,
      _height = 200;
  var keepAspectRatio = false;
  var aspectRatio = 0;

  if (options.keepAspectRatio) {
    keepAspectRatio = options.keepAspectRatio;
  }

  if (options.top) {
    _top = Number(options.top);
  }

  if (options.left) {
    _left = Number(options.left);
  }

  if (options.width) {
    _width = Number(options.width);
  }

  if (options.height) {
    _height = Number(options.height);
  }

  if (options.center) {
    _top = Math.round((window.innerHeight - _height - taskbarHeight) / 2);
    _left = Math.round((window.innerWidth - _width) / 2);
  }

  if (keepAspectRatio) {
    aspectRatio = _width / _height;
  }

  style.top = _top + 'px';
  style.left = _left + 'px';
  style.width = _width + 'px';
  style.height = _height + 'px';
  var className = '';
  var windowContentClassName = 'window-content';

  if (options.fluidContent) {
    windowContentClassName += ' fluid';
  }

  if (!options.transprencyContent) {
    windowContentClassName += ' theme-background';
  }

  var resizeTop, resizeLeft, resizeBottom, resizeRight, resizeTopLeftV, resizeTopLeftH, resizeBottomLeftV, resizeBottomLeftH, resizeBottomRightV, resizeBottomRightH, resizeTopRightV, resizeTopRightH;

  var _window;

  var resizeDisabledClassName = options.disableResize ? ' disabled' : '';
  _window = createElement('div', {
    tabIndex: -1,
    className: 'window' + className,
    style: style
  }, [createElement('div', {
    className: 'window-background absolute w-full h-full'
  }), createElement('div', {
    className: 'window-inner relative w-full h-full'
  }, [titlebar.element, createElement('div', {
    className: windowContentClassName
  }, windowContent = createElement('div', {
    className: 'relative w-full h-full'
  }))]), resizeTop = createElement('div', {
    'data-resize': 't',
    className: 'window-resize-handle window-resize-horizontal window-resize-top' + resizeDisabledClassName
  }), resizeBottom = createElement('div', {
    'data-resize': 'b',
    className: 'window-resize-handle window-resize-horizontal window-resize-bottom' + resizeDisabledClassName
  }), resizeLeft = createElement('div', {
    'data-resize': 'l',
    className: 'window-resize-handle window-resize-vertical window-resize-left' + resizeDisabledClassName
  }), resizeRight = createElement('div', {
    'data-resize': 'r',
    className: 'window-resize-handle window-resize-vertical window-resize-right' + resizeDisabledClassName
  }), //Corner
  // TopLeft
  resizeTopLeftV = createElement('div', {
    'data-resize': 'tl',
    className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-tl window-resize-tl-v' + resizeDisabledClassName
  }), resizeTopLeftH = createElement('div', {
    'data-resize': 'tl',
    className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-tl window-resize-tl-h' + resizeDisabledClassName
  }), // BottomRight
  resizeBottomRightV = createElement('div', {
    'data-resize': 'br',
    className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-br window-resize-br-v' + resizeDisabledClassName
  }), resizeBottomRightH = createElement('div', {
    'data-resize': 'br',
    className: 'window-resize-handle window-resize-conner window-resize-nw window-resize-br window-resize-br-h' + resizeDisabledClassName
  }), // BottomLeft
  resizeBottomLeftV = createElement('div', {
    'data-resize': 'bl',
    className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-bl window-resize-bl-v' + resizeDisabledClassName
  }), resizeBottomLeftH = createElement('div', {
    'data-resize': 'bl',
    className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-bl window-resize-bl-h' + resizeDisabledClassName
  }), // TopRight
  resizeTopRightV = createElement('div', {
    'data-resize': 'tr',
    className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-tr window-resize-tr-v' + resizeDisabledClassName
  }), resizeTopRightH = createElement('div', {
    'data-resize': 'tr',
    className: 'window-resize-handle window-resize-conner window-resize-ne window-resize-tr window-resize-tr-h' + resizeDisabledClassName
  })]);
  appendChild(document.body, _window);
  var mouseTimeout;

  if (options.autoHideTitleBar) {
    _window.addEventListener('mouseover', onmouseover, false);

    _window.addEventListener('mouseout', onmouseout, false);

    _window.addEventListener('mousemove', onmousemove, false);
  }

  function onmouseover() {
    if (mouseTimeout) clearTimeout(mouseTimeout);
    titlebar.setAutoHide(false);
    if (_autoHideTitleBar) titlebar.setAutoHide(true);
  }

  function onmousemove() {
    if (mouseTimeout) clearTimeout(mouseTimeout);
    titlebar.setAutoHide(false);
    mouseTimeout = setTimeout(function () {
      if (_autoHideTitleBar) titlebar.setAutoHide(true);
    }, 100);
  }

  function onmouseout() {
    if (mouseTimeout) clearTimeout(mouseTimeout);
    if (_autoHideTitleBar) titlebar.setAutoHide(true);
  }

  function setAutoHideTitleBar(autoHide) {
    _autoHideTitleBar = autoHide;
    titlebar.setAutoHide(autoHide);
  }

  function setContent(content) {
    appendChild(windowContent, content);
  }

  function _resizeElems(elem, events) {
    var resizeHandlers = [resizeElem(elem, resizeTop, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeBottom, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeLeft, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeRight, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeTopLeftV, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeTopLeftH, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeBottomLeftV, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeBottomLeftH, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeBottomRightV, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeBottomRightH, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeTopRightV, keepAspectRatio, aspectRatio, events), resizeElem(elem, resizeTopRightH, keepAspectRatio, aspectRatio, events)];

    function setAspectRatio(ratio) {
      for (var index = 0; index < resizeHandlers.length; index++) {
        resizeHandlers[index].setAspectRatio(ratio);
      }
    }

    function setKeepAspectRatio(keep) {
      for (var index = 0; index < resizeHandlers.length; index++) {
        resizeHandlers[index].setKeepAspectRatio(keep);
      }
    }

    return {
      setAspectRatio: setAspectRatio,
      setKeepAspectRatio: setKeepAspectRatio
    };
  }

  function onResizeEnd() {
    executeListeners('resizeend');
    onDragEnd();
  }

  if (!options.disableResize) {
    resizeHanders = _resizeElems(_window, {
      onResizeStart: function onResizeStart() {
        return executeListeners('resizestart');
      },
      onResize: function onResize() {
        return executeListeners('resize');
      },
      onResizeEnd: onResizeEnd
    });
  }

  document.addEventListener('mousedown', onDocumentMouseDown, false);

  function onDocumentMouseDown(e) {
    var target = e.target;

    if (_window.contains(target)) {
      focus$1();
    } else {
      blur();
    }
  }

  function onMinimizeButtonClick() {
    hide();
  }

  function _onMinimize() {
    executeListeners('minimize');
  }

  function _onMaximize() {
    executeListeners('maximize');
  }

  function _onRestore() {

    if (!maximized) {
      _window.classList.remove('window-maximized');
    }

    executeListeners('restore');
  }

  function onMaximizeButtonClick() {
    toggleMaximize();
  }

  dragElement(_window, titlebar.titleElem, {
    onDragStart: function onDragStart() {
      return executeListeners('dragstart');
    },
    onDrag: onDrag,
    onDragEnd: onDragEnd
  });

  function onDrag(cordinate) {
    setTimeout(function () {
      if (maximized) {
        var leftDelta = Math.round(cordinate.x / window.innerWidth * lastBounds.width);
        var left = cordinate.x - leftDelta;
        setBounds(_extends({}, lastBounds, {
          top: 0,
          left: left
        }));
        maximized = false;
        titlebar.setMaximize(maximized);

        _window.classList.remove('window-maximized');
      }
    }, 0);
    dragTop = cordinate.y <= 0;
    executeListeners('drag', cordinate);
  }

  function onRestoreDown() {
    _window.classList.add('window-restore-down');

    setTimeout(function () {
      _window.classList.remove('window-restore-down');
    }, 100);
  }

  function onDragEnd() {
    if (!maximized) {
      if (dragTop && !options.disableMaximize) {
        toggleMaximize();
        dragTop = false;
      } else {
        if (_window.offsetTop < 0) {
          _window.style.top = 0 + 'px';
        }

        if (window.innerHeight - _window.offsetTop < taskbarHeight + titlebarHeight) {
          _window.style.top = window.innerHeight - (taskbarHeight + titlebarHeight) + 'px';
        }

        if (_window.offsetLeft + _window.offsetWidth < 30) {
          _window.style.left = -100 + 'px';
        }

        if (window.innerWidth - _window.offsetLeft < 30) {
          _window.style.left = window.innerWidth - 100 + 'px';
        }
      }
    }

    executeListeners('dragend');
  }

  function maximize() {
    if (!options.disableMaximize) {
      setBounds({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight
      });

      _window.classList.add('window-maximized');

      _onMaximize();
    }
  }

  function unMaximize() {
    if (!options.disableMaximize) {
      setBounds(lastBounds);

      _window.classList.remove('window-maximized');

      onRestoreDown();
    }
  }

  function toggleMaximize() {
    if (!options.disableMaximize) {
      maximized = !maximized;

      if (maximized) {
        lastBounds = getBounds();
        maximize();
      } else {
        unMaximize();
      }

      titlebar.setMaximize(maximized);
    }
  }

  function onDoubleClick() {
    toggleMaximize();
  }

  function setBounds(bounds) {
    _top = bounds.top;
    _left = bounds.left;
    _width = bounds.width;
    _height = bounds.height;
    _window.style.top = bounds.top + 'px';
    _window.style.left = bounds.left + 'px';
    _window.style.width = bounds.width + 'px';
    _window.style.height = bounds.height + 'px';
    if (!options.disableResize) resizeHanders.setAspectRatio(_width / _height);
  }

  function getBounds() {
    var bounds = _window.getBoundingClientRect();

    return {
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height
    };
  }

  function setSize(size) {
    _width = size.width;
    _height = size.height;
    _window.style.width = size.width + 'px';
    _window.style.height = size.height + 'px';
    if (!options.disableResize) resizeHanders.setAspectRatio(_width / _height);
  }

  function setZIndex() {
    _window.style.zIndex = zIndex.toString();
  }

  function decrementZIndex() {
    zIndex -= 1;
    setZIndex();
  }

  function restoreZIndex() {
    zIndex = maxZIndex;
    setZIndex();
  }

  function removeTopView() {
    _window.classList.remove('top-view');
  }

  function focus$1() {
    _window.focus();

    _window.classList.add('focus');

    removeTopView();

    if (!focused) {
      focus(windowInfo.name, id, windowInfo);
    }

    focused = true;
    Taskbar.setActiveWindow(windowInfo.name, id);
    executeListeners('focus');
  }

  function blur() {
    focused = false;

    _window.classList.remove('focus');
    Taskbar.removeActiveWindow(windowInfo.name, id);
    executeListeners('blur');
  }

  function makeTransparent() {
    _window.classList.add('transparent');

    isTransparent = true;
  }

  function removeTransparent() {
    _window.classList.remove('transparent');

    isTransparent = false;
  }

  function toggleTransprent() {
    isTransparent ? removeTransparent() : makeTransparent();
  }

  function toggleFullscreen() {
    isFullScreen = !isFullScreen;

    if (isFullScreen) {
      lastBounds = getBounds();
      setBounds({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      });

      _window.classList.add('fullscreen');

      titlebar.setVisible(false);
    } else {
      setBounds(lastBounds);
      titlebar.setVisible(true);

      _window.classList.remove('fullscreen');
    }

    executeListeners('fullscreen', isFullScreen);
  }

  function isMaximized() {
    return maximized;
  }

  function onShowEnd() {
    _window.classList.remove('show');

    _window.removeEventListener('animationend', onShowEnd, false);
  }

  function show() {
    _window.classList.remove('minimized');

    removeTopView();

    if (minimized) {
      _window.classList.add('window-restored');

      _window.style.transform = 'translate3d(0px,0px,0px)';
      setTimeout(function () {
        _window.classList.remove('window-restored');

        _window.style.removeProperty('transform');
      }, 300);
    } else {
      if (!isShow) {
        _window.classList.add('show');

        _window.addEventListener('animationend', onShowEnd, false);
      }
    }

    isShow = true;
    minimized = false;
    restoreZIndex();

    if (maximized) {
      maximize();
    }

    _onRestore();
  }

  function hide() {
    removeTopView();
    var taskbarItemBounds = Taskbar.getAppItemBounds(options.name);

    _window.classList.remove('window-restored');

    _window.classList.remove('show');

    _window.classList.remove('focus');

    _window.classList.add('minimized');

    var bounds = getBounds();
    setTimeout(function () {
      _window.style.transform = "translate3d(" + (taskbarItemBounds.left - bounds.left) + "px, " + taskbarItemBounds.top + "px, 0) scale(0.2)";
    }, 0);
    isShow = false;
    focused = false;
    minimized = true;
    Taskbar.removeActiveWindow(options.name, id);

    _onMinimize();
  }

  function toggleShow() {
    if (isShow) {
      hide();
    } else {
      show();
    }
  }

  function onCloseButtonClick() {
    close();
  }

  function close() {
    document.removeEventListener('mousedown', onDocumentMouseDown, false);
    _window.className = 'window closing';

    _window.addEventListener('animationend', function () {
      titlebar.element.remove();

      _window.remove();

      _window = undefined;
      removeWindow(options.name, id);
      executeListeners('close');
    });
  }

  function isVisible() {
    return isShow;
  }

  function isFocused() {
    return focused;
  }

  function setTitle(text) {
    title = text;
    titlebar.setTitle(text);
  }

  function getTitle() {
    return title;
  }

  function setPosition(position) {
    _window.style.top = position.top + 'px';
    _window.style.left = position.left + 'px';
  }

  function makeCenter() {
    var _top = Math.round((window.innerHeight - _height - taskbarHeight) / 2);

    var _left = Math.round((window.innerWidth - _width) / 2);

    setPosition({
      top: _top,
      left: _left
    });
  }

  windowInfo = {
    id: id,
    name: options.name,
    element: _window,
    setContent: setContent,
    show: show,
    hide: hide,
    titlebar: titlebar,
    setAutoHideTitleBar: setAutoHideTitleBar,
    setIcon: titlebar.setIcon,
    setTitle: setTitle,
    getTitle: getTitle,
    setMaximize: titlebar.setMaximize,
    toggleMaximize: toggleMaximize,
    maximize: maximize,
    decrementZIndex: decrementZIndex,
    restoreZIndex: restoreZIndex,
    focus: focus$1,
    blur: blur,
    makeTransparent: makeTransparent,
    removeTransparent: removeTransparent,
    toggleTransprent: toggleTransprent,
    toggleFullscreen: toggleFullscreen,
    isMaximized: isMaximized,
    close: close,
    toggleShow: toggleShow,
    isVisible: isVisible,
    isFocused: isFocused,
    setBounds: setBounds,
    setSize: setSize,
    makeCenter: makeCenter,
    addEventListener: addEventListener,
    executeListeners: executeListeners
  };

  if (typeof options.content === 'function') {
    setContent(options.content(windowInfo));
  }

  addWindow(options.name, id, windowInfo);
  show();
  focus$1();
  return windowInfo;
}

var Explorer = function Explorer(appInfo, _args) {
  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top: 50,
    left: 50,
    width: 800,
    height: 500,
    transprencyContent: true,
    fluidContent: true,
    content: function content(win) {
      return createElement('div', {
        className: 'w-full h-full flex'
      }, [createElement('div', {
        className: 'explorer-sidebar flex-shrink-0 h-full',
        style: {
          width: '200px',
          borderRight: '1px solid var(--border-color)'
        }
      }, createElement('div', {
        className: 'standard-content'
      }, createElement('div', {
        className: 'w-full h-full p-20 text'
      }, [createElement('div', {}, 'This PC'), createElement('button', {
        onclick: function onclick() {
          return win.setTitle(Date.now().toString(16));
        }
      }, 'Change title')]))), createElement('div', {
        className: 'theme-background-primary explorer-content flex-1  h-full'
      })]);
    }
  });
};

function CommingSoonApp(appInfo, _args) {
  var top = randomIntFromInterval(50, 200);
  var left = randomIntFromInterval(50, 200);
  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top: top,
    left: left,
    width: 450,
    height: 300,
    content: function content() {
      return createElement('div', {
        className: 'w-full h-full flex content-center items-center'
      }, createElement('h3', {}, 'In Progress'));
    }
  });
}

var NotePad = function NotePad(appInfo, args) {
  var notepad = function notepad(win) {
    var notePadElem = createElement('div', {
      tabIndex: 0,
      contentEditable: true,
      className: 'w-full h-full',
      style: {
        borderTop: '1px solid var(--border-color)',
        outline: 0,
        padding: '5px',
        color: 'var(--primary-text-color)',
        font: '400 14px Consolas',
        overflow: 'auto',
        cursor: 'default'
      }
    });

    if (args) {
      readFile(args, function (text) {
        win.setTitle(getFileName(args) + ' - NotePad');
        notePadElem.innerText = text;
      });
    }

    win.addEventListener('focus', function () {
      setTimeout(function () {
        notePadElem.focus();
      }, 0);
    });
    return notePadElem;
  };

  Window({
    args: args,
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top: 100,
    left: 100,
    width: 600,
    height: 400,
    content: notepad
  });
};

function getVideoInfo(src, cb) {
  var video = document.createElement('video');

  video.onloadedmetadata = function () {
    cb({
      width: video.videoWidth,
      height: video.videoHeight,
      ratio: video.videoWidth / video.videoHeight,
      duration: video.duration
    });
  };

  video.src = src;
}

var videos = ['Drone Shot of a Church Tower.mp4', 'The Church of a Mountain Valley Town.mp4', 'Clouds Over Rocky Mountains.mp4', 'newyork city at night.mp4', 'Area Of NewYork City At Night.mp4'];

var Photos = function Photos(appInfo, _args) {
  var photos = function photos(win) {
    var vid = videos[Math.floor(Math.random() * videos.length)];

    if (_args) {
      vid = getFileName(_args);
    }

    var videoElem, videoOverlay;
    win.setTitle(vid);
    win.element.style.setProperty('--titlebar-text-color', '#fff');
    win.element.style.setProperty('--window-button-icon-color', '#fff');
    win.addEventListener('focus', function () {
      setTimeout(function () {
        videoElem.focus();
      }, 0);
    });
    win.addEventListener('ontitlebarshow', function () {
      videoOverlay.classList.remove('hide');
      videoOverlay.classList.add('show');
    });
    win.addEventListener('ontitlebarhide', function () {
      videoOverlay.classList.remove('show');
      videoOverlay.classList.add('hide');
    });
    win.addEventListener('fullscreen', function (isFullScreen) {
      videoElem.style.objectFit = isFullScreen ? 'contain' : 'cover';
    });
    win.addEventListener('secondInstance', function (args) {
      if (!win.isVisible()) {
        win.show();
      }

      win.focus();

      if (args) {
        videoElem.src = args;
        videoElem.play();
        win.setTitle(getFileName(args));
      }
    });
    getVideoInfo("videos/" + vid, function (videoInfo) {
      var size = {
        width: videoInfo.width,
        height: videoInfo.height
      };
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight;

      if (size.width > screenWidth) {
        size.width = Math.round(screenWidth * 80 / 100);
        size.height = Math.round(size.width / videoInfo.ratio);
      }

      if (size.height > (screenHeight - taskbarHeight) * 90 / 100) {
        size.height = Math.round((screenHeight - taskbarHeight) * 80 / 100);
        size.width = Math.round(size.height * videoInfo.ratio);
      }

      win.setSize(size);
      win.makeCenter();
      videoElem.play();
    });

    function onplay() {
      win.setAutoHideTitleBar(true);
    }

    function onpause() {
      win.setAutoHideTitleBar(false);
    }

    function onended() {
      win.setAutoHideTitleBar(false);
    }

    return createElement('div', {
      className: 'app-photos w-full h-full'
    }, [videoElem = createElement('video', {
      className: 'w-full h-full',
      src: "videos/" + vid,
      controls: true,
      style: {
        objectFit: 'cover'
      },
      onended: onended,
      onplay: onplay,
      onpause: onpause
    }), videoOverlay = createElement('div', {
      className: 'video-overlays'
    }, [createElement('div', {
      className: 'video-overlay video-overlay-top'
    }), createElement('div', {
      className: 'video-overlay video-overlay-bottom'
    }), createElement('button', {
      onclick: win.toggleFullscreen,
      className: 'absolute',
      style: {
        left: '40px',
        top: '40px',
        zIndex: 1
      }
    }, 'Toggle fullscreen')])]);
  };

  Window({
    args: _args,
    name: appInfo.name,
    title: appInfo.productName,
    top: 100,
    left: 100,
    width: 450,
    height: 300,
    fluidContent: true,
    keepAspectRatio: true,
    disableMaximize: true,
    singleInstance: true,
    center: true,
    autoHideTitleBar: true,
    content: photos
  });
};

function CheckBox(label, checked, onchange) {
  var checkboxElem;
  var checkbox = createElement('div', {
    className: 'checkbox'
  }, createElement('label', {
    type: 'checkbox',
    className: 'text'
  }, [checkboxElem = createElement('input', {
    type: 'checkbox',
    className: 'checkbox-input',
    checked: checked,
    onchange: onchange
  }), createElement('div', {
    className: 'checkbox-label'
  }, label)]));

  function setChecked(checked) {
    checkboxElem.checked = checked;
  }

  return {
    element: checkbox,
    setChecked: setChecked
  };
}

function getFileIcon(name) {
  return "imgs/icons/" + name;
}

var FileMapping = {
  '.jpg': {
    icon: /*#__PURE__*/getFileIcon('Pictures file.png'),
    appName: 'photos'
  },
  '.png': {
    icon: /*#__PURE__*/getFileIcon('Pictures file.png'),
    appName: 'photos'
  },
  '.mp3': {
    icon: /*#__PURE__*/getFileIcon('Audio file.png'),
    appName: 'photos'
  },
  '.aac': {
    icon: /*#__PURE__*/getFileIcon('Audio file.png'),
    appName: 'photos'
  },
  '.ogg': {
    icon: /*#__PURE__*/getFileIcon('Audio file.png'),
    appName: 'photos'
  },
  '.mp4': {
    icon: /*#__PURE__*/getFileIcon('Videos file.png'),
    appName: 'photos'
  },
  '.mkv': {
    icon: /*#__PURE__*/getFileIcon('Videos file.png'),
    appName: 'photos'
  },
  '.webm': {
    icon: /*#__PURE__*/getFileIcon('Videos file.png'),
    appName: 'photos'
  },
  '.txt': {
    icon: /*#__PURE__*/getFileIcon('Notes.png'),
    appName: 'notepad'
  }
};

function DesktopItems() {
  var appItems = [{
    icon: 'imgs/icons/Trash Empty.png',
    name: 'explorer',
    productName: 'Recycle Bin',
    args: '/trash',
    type: "app"
  }, _extends({}, AppInfo.settings, {
    type: "app"
  }), _extends({}, AppInfo.notepad, {
    type: "app"
  }), _extends({}, AppInfo.explorer, {
    type: "app"
  }), _extends({}, AppInfo.photos, {
    type: "app"
  }), _extends({}, AppInfo.github, {
    type: "link",
    args: 'https://github.com/chrishtu/windows11'
  }), {
    type: "file",
    args: 'videos/The Church of a Mountain Valley Town.mp4'
  }, {
    type: "file",
    args: 'videos/Clouds Over Rocky Mountains.mp4'
  }, {
    type: "file",
    args: 'videos/newyork city at night.mp4'
  }, {
    type: "file",
    args: 'videos/Area Of NewYork City At Night.mp4'
  }, {
    type: "file",
    args: 'documents/untitle.txt'
  }];

  function onDesktopItemDblClick(appItem) {
    startProcess(appItem);
  }

  var desktopItemsElem = createElement('div', {
    className: 'desktop-app-items fixed top w-full flex flex-col flex-wrap',
    style: {
      height: "calc(100% - " + taskbarHeight + "px)"
    }
  }, appItems.map(function (currentAppInfo, index) {
    var iconProps = Object.create(null);
    iconProps.className = 'desktop-app-item-icon';
    var itemContent = currentAppInfo.productName;
    iconProps.style = Object.create(null);

    if (currentAppInfo.icon) {
      if (currentAppInfo.iconType === 'svg') {
        iconProps.innerHTML = currentAppInfo.icon;
      } else {
        iconProps.style.backgroundImage = "url(\"" + currentAppInfo.icon + "\")";
      }
    }

    if (currentAppInfo.type === 'file') {
      var fileInfo = FileMapping[getExt(currentAppInfo.args)];

      if (fileInfo.icon) {
        if (fileInfo.iconType === 'svg') {
          iconProps.innerHTML = fileInfo.icon;
        } else {
          iconProps.style.backgroundImage = "url(\"" + fileInfo.icon + "\")";
        }
      } else {
        iconProps.style.backgroundImage = "url(\"imgs/icons/Blank.png\")";
      }

      itemContent = getFileName(currentAppInfo.args);
    }

    return createElement('div', {
      key: 'd-i' + index,
      className: 'desktop-app-item',
      ondblclick: onDesktopItemDblClick.bind(null, currentAppInfo)
    }, [createElement('div', iconProps), createElement('div', {
      title: itemContent,
      className: 'desktop-app-item-label'
    }, createElement('div', {
      className: 'text-ellipsis line-clamp-2'
    }, itemContent))]);
  }));
  return desktopItemsElem;
}

function Desktop() {
  var desktop = createElement('div', {
    className: 'desktop fade-in'
  });
  appendChild(document.body, desktop);
  setTimeout(function () {
    appendChild(desktop, DesktopItems());
  }, 500);

  function setBackgroundImage(path) {
    setTimeout(function () {
      desktop.classList.remove('fade-in');
      var image = new Image();

      image.onload = function () {
        desktop.classList.add('fade-in');
        desktop.style.backgroundImage = "url(\"" + path + "\")";
      };

      image.src = path;
    }, 250);
    setState({
      backgroundImage: path
    });
  }

  return {
    element: desktop,
    setBackgroundImage: setBackgroundImage
  };
}

var desktop = /*#__PURE__*/Desktop();

var Settings = function Settings(appInfo, _args) {
  var _getState = getState(['darktheme', 'transparency', 'nightlight']),
      darktheme = _getState.darktheme,
      transparency = _getState.transparency,
      nightlight = _getState.nightlight;

  var settings = function settings(_window) {
    _window.addEventListener('secondInstance', function (_args) {
      if (!_window.isVisible()) {
        _window.show();
      }

      _window.focus();
    });

    var darkThemeCheckbox = CheckBox('Dark Theme', darktheme, _toggleTheme);
    listenEvent(eventNames.themeChange, 'settings', function (isDark) {
      darktheme = isDark;
      darkThemeCheckbox.setChecked(isDark);
    });
    var transparencyCheckbox = CheckBox('Transparency', transparency, toggleTransparency);
    listenEvent(eventNames.transparentChange, 'settings', function (enabled) {
      transparency = enabled;
      transparencyCheckbox.setChecked(enabled);
    });
    var nightlightCheckbox = CheckBox('Night Light', nightlight, DesktopScreen$1.toogleNightLight);
    listenEvent(eventNames.nightLightChange, 'settings', function (enabled) {
      nightlight = enabled;
      nightlightCheckbox.setChecked(enabled);
    });
    return createElement('div', {
      className: 'w-full h-full p-0-20 scrollable'
    }, [darkThemeCheckbox.element, transparencyCheckbox.element, nightlightCheckbox.element, createElement('div', {
      className: 'w-full divider divider-horizontal',
      style: {
        height: '1px',
        backgroundColor: 'var(--border-color)'
      }
    }), createElement('div', {
      className: 'w-full background-selector'
    }, [createElement('label', {}, 'Background Image'), createElement('div', {
      className: 'w-full background-items'
    }, wallpapers.map(function (image) {
      return createElement('div', {
        className: 'background-item'
      }, createElement('div', {
        className: 'background-item-inner w-full h-full'
      }, createElement('div', {
        className: 'background-item-image w-full h-full',
        style: {
          backgroundImage: "url(\"" + image.thumbnailPath + "\")"
        },
        onclick: changeBackGround.bind(null, image.path)
      })));
    }))])]);
  };

  function _toggleTheme() {
    toggleTheme(function (dark) {
      darktheme = dark;
    });
  }

  function changeBackGround(path) {
    desktop.setBackgroundImage(path);
  }

  Window({
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    singleInstance: true,
    top: 200,
    left: 300,
    width: 800,
    height: 520,
    center: true,
    content: settings
  });
};

var Apps = {
  settings: Settings,
  explorer: Explorer,
  notepad: NotePad,
  word: CommingSoonApp,
  powerpoint: CommingSoonApp,
  onenote: CommingSoonApp,
  mail: CommingSoonApp,
  todo: CommingSoonApp,
  store: CommingSoonApp,
  photos: Photos,
  yourphone: CommingSoonApp,
  whiteboard: CommingSoonApp,
  calculator: CommingSoonApp,
  spotify: CommingSoonApp,
  twitter: CommingSoonApp,
  vscode: CommingSoonApp,
  terminal: CommingSoonApp,
  github: CommingSoonApp,
  discord: CommingSoonApp
};

if (isWebkit) {
  document.documentElement.classList.add('isWebkit');
}

var state = /*#__PURE__*/getState(['darktheme', 'transparency', 'backgroundImage', 'brightness', 'nightlight']);

if (state.darktheme) {
  enableDarkTheme(state.darktheme);
}

if (state.transparency) {
  setTransparencyEffect(state.transparency);
}

if (state.backgroundImage) {
  desktop.setBackgroundImage(state.backgroundImage);
}

if (state.brightness) {
  DesktopScreen$1.setBrightness(state.brightness || 100);
}

if (state.nightlight) {
  DesktopScreen$1.setNightLight(state.nightlight);
}

function createWindow$1(appName, args) {
  var appInfo = AppInfo[appName];
  Apps[appName](appInfo, args);
}

function startProcess$1(processInfo) {
  if (processInfo.type === 'link') {
    window.open(processInfo.args, '_blank');
  } else if (processInfo.type === 'app') {
    createWindow$1(processInfo.name, processInfo.args);
  } else if (processInfo.type === 'file') {
    var fileInfo = FileMapping[getExt(processInfo.args)];
    createWindow$1(fileInfo.appName, processInfo.args);
  }
} // From Proceduce


listenEvent(eventNames.createWindow, 'index', function (_ref) {
  var appName = _ref.appName,
      args = _ref.args;
  createWindow$1(appName, args);
});
listenEvent(eventNames.startProcess, 'index', function (processInfo) {
  startProcess$1(processInfo);
});
//# sourceMappingURL=windows11.esm.js.map
