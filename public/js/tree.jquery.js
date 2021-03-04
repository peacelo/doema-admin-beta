/*
JqTree 1.5.2

Copyright 2020 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
@license

*/
var jqtree = (function (e, t) {
    "use strict";
    function o(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
    }
    function n(e) {
        if (e && e.__esModule) return e;
        var t = Object.create(null);
        return (
            e &&
                Object.keys(e).forEach(function (o) {
                    if ("default" !== o) {
                        var n = Object.getOwnPropertyDescriptor(e, o);
                        Object.defineProperty(
                            t,
                            o,
                            n.get
                                ? n
                                : {
                                      enumerable: !0,
                                      get: function () {
                                          return e[o];
                                      },
                                  }
                        );
                    }
                }),
            (t.default = e),
            Object.freeze(t)
        );
    }
    var r = o(t),
        i = n(t),
        s = function (e, t) {
            return (s =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                        e.__proto__ = t;
                    }) ||
                function (e, t) {
                    for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                })(e, t);
        };
    function a(e, t) {
        function o() {
            this.constructor = e;
        }
        s(e, t), (e.prototype = null === t ? Object.create(t) : ((o.prototype = t.prototype), new o()));
    }
    var l,
        d = function () {
            return (d =
                Object.assign ||
                function (e) {
                    for (var t, o = 1, n = arguments.length; o < n; o++) for (var r in (t = arguments[o])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e;
                }).apply(this, arguments);
        };
    !(function (e) {
        (e[(e.Before = 1)] = "Before"), (e[(e.After = 2)] = "After"), (e[(e.Inside = 3)] = "Inside"), (e[(e.None = 4)] = "None");
    })(l || (l = {}));
    var h = { before: l.Before, after: l.After, inside: l.Inside, none: l.None },
        u = function (e) {
            for (var t in h) if (Object.prototype.hasOwnProperty.call(h, t) && h[t] === e) return t;
            return "";
        },
        p = (function () {
            function e(t, o, n) {
                void 0 === t && (t = null),
                    void 0 === o && (o = !1),
                    void 0 === n && (n = e),
                    (this.name = ""),
                    (this.isEmptyFolder = !1),
                    (this.load_on_demand = !1),
                    this.setData(t),
                    (this.children = []),
                    (this.parent = null),
                    o && ((this.idMapping = {}), (this.tree = this), (this.nodeClass = n));
            }
            return (
                (e.prototype.setData = function (e) {
                    if (e)
                        if ("string" == typeof e) this.name = e;
                        else if ("object" == typeof e)
                            for (var t in e)
                                if (Object.prototype.hasOwnProperty.call(e, t)) {
                                    var o = e[t];
                                    "label" === t || "name" === t ? "string" == typeof o && (this.name = o) : "children" !== t && "parent" !== t && (this[t] = o);
                                }
                }),
                (e.prototype.loadFromData = function (e) {
                    this.removeChildren();
                    for (var t = 0, o = e; t < o.length; t++) {
                        var n = o[t],
                            r = this.createNode(n);
                        this.addChild(r), "object" == typeof n && n.children && n.children instanceof Array && (0 === n.children.length ? (r.isEmptyFolder = !0) : r.loadFromData(n.children));
                    }
                    return this;
                }),
                (e.prototype.addChild = function (e) {
                    this.children.push(e), e.setParent(this);
                }),
                (e.prototype.addChildAtPosition = function (e, t) {
                    this.children.splice(t, 0, e), e.setParent(this);
                }),
                (e.prototype.removeChild = function (e) {
                    e.removeChildren(), this.doRemoveChild(e);
                }),
                (e.prototype.getChildIndex = function (e) {
                    return this.children.indexOf(e);
                }),
                (e.prototype.hasChildren = function () {
                    return 0 !== this.children.length;
                }),
                (e.prototype.isFolder = function () {
                    return this.hasChildren() || this.load_on_demand;
                }),
                (e.prototype.iterate = function (e) {
                    var t = function (o, n) {
                        if (o.children)
                            for (var r = 0, i = o.children; r < i.length; r++) {
                                var s = i[r];
                                e(s, n) && s.hasChildren() && t(s, n + 1);
                            }
                    };
                    t(this, 0);
                }),
                (e.prototype.moveNode = function (e, t, o) {
                    if (!e.parent || e.isParentOf(t)) return !1;
                    switch ((e.parent.doRemoveChild(e), o)) {
                        case l.After:
                            return !!t.parent && (t.parent.addChildAtPosition(e, t.parent.getChildIndex(t) + 1), !0);
                        case l.Before:
                            return !!t.parent && (t.parent.addChildAtPosition(e, t.parent.getChildIndex(t)), !0);
                        case l.Inside:
                            return t.addChildAtPosition(e, 0), !0;
                        default:
                            return !1;
                    }
                }),
                (e.prototype.getData = function (e) {
                    void 0 === e && (e = !1);
                    var t = function (e) {
                        return e.map(function (e) {
                            var o = {};
                            for (var n in e)
                                if (-1 === ["parent", "children", "element", "idMapping", "load_on_demand", "nodeClass", "tree", "isEmptyFolder"].indexOf(n) && Object.prototype.hasOwnProperty.call(e, n)) {
                                    var r = e[n];
                                    o[n] = r;
                                }
                            return e.hasChildren() && (o.children = t(e.children)), o;
                        });
                    };
                    return t(e ? [this] : this.children);
                }),
                (e.prototype.getNodeByName = function (e) {
                    return this.getNodeByCallback(function (t) {
                        return t.name === e;
                    });
                }),
                (e.prototype.getNodeByNameMustExist = function (e) {
                    var t = this.getNodeByCallback(function (t) {
                        return t.name === e;
                    });
                    if (!t) throw "Node with name " + e + " not found";
                    return t;
                }),
                (e.prototype.getNodeByCallback = function (e) {
                    var t = null;
                    return (
                        this.iterate(function (o) {
                            return !t && (!e(o) || ((t = o), !1));
                        }),
                        t
                    );
                }),
                (e.prototype.addAfter = function (e) {
                    if (this.parent) {
                        var t = this.createNode(e),
                            o = this.parent.getChildIndex(this);
                        return this.parent.addChildAtPosition(t, o + 1), "object" == typeof e && e.children && e.children instanceof Array && e.children.length && t.loadFromData(e.children), t;
                    }
                    return null;
                }),
                (e.prototype.addBefore = function (e) {
                    if (this.parent) {
                        var t = this.createNode(e),
                            o = this.parent.getChildIndex(this);
                        return this.parent.addChildAtPosition(t, o), "object" == typeof e && e.children && e.children instanceof Array && e.children.length && t.loadFromData(e.children), t;
                    }
                    return null;
                }),
                (e.prototype.addParent = function (e) {
                    if (this.parent) {
                        var t = this.createNode(e);
                        this.tree && t.setParent(this.tree);
                        for (var o = this.parent, n = 0, r = o.children; n < r.length; n++) {
                            var i = r[n];
                            t.addChild(i);
                        }
                        return (o.children = []), o.addChild(t), t;
                    }
                    return null;
                }),
                (e.prototype.remove = function () {
                    this.parent && (this.parent.removeChild(this), (this.parent = null));
                }),
                (e.prototype.append = function (e) {
                    var t = this.createNode(e);
                    return this.addChild(t), "object" == typeof e && e.children && e.children instanceof Array && e.children.length && t.loadFromData(e.children), t;
                }),
                (e.prototype.prepend = function (e) {
                    var t = this.createNode(e);
                    return this.addChildAtPosition(t, 0), "object" == typeof e && e.children && e.children instanceof Array && e.children.length && t.loadFromData(e.children), t;
                }),
                (e.prototype.isParentOf = function (e) {
                    for (var t = e.parent; t; ) {
                        if (t === this) return !0;
                        t = t.parent;
                    }
                    return !1;
                }),
                (e.prototype.getLevel = function () {
                    for (var e = 0, t = this; t.parent; ) (e += 1), (t = t.parent);
                    return e;
                }),
                (e.prototype.getNodeById = function (e) {
                    return this.idMapping[e] || null;
                }),
                (e.prototype.addNodeToIndex = function (e) {
                    null != e.id && (this.idMapping[e.id] = e);
                }),
                (e.prototype.removeNodeFromIndex = function (e) {
                    null != e.id && delete this.idMapping[e.id];
                }),
                (e.prototype.removeChildren = function () {
                    var e = this;
                    this.iterate(function (t) {
                        var o;
                        return null === (o = e.tree) || void 0 === o || o.removeNodeFromIndex(t), !0;
                    }),
                        (this.children = []);
                }),
                (e.prototype.getPreviousSibling = function () {
                    if (this.parent) {
                        var e = this.parent.getChildIndex(this) - 1;
                        return e >= 0 ? this.parent.children[e] : null;
                    }
                    return null;
                }),
                (e.prototype.getNextSibling = function () {
                    if (this.parent) {
                        var e = this.parent.getChildIndex(this) + 1;
                        return e < this.parent.children.length ? this.parent.children[e] : null;
                    }
                    return null;
                }),
                (e.prototype.getNodesByProperty = function (e, t) {
                    return this.filter(function (o) {
                        return o[e] === t;
                    });
                }),
                (e.prototype.filter = function (e) {
                    var t = [];
                    return (
                        this.iterate(function (o) {
                            return e(o) && t.push(o), !0;
                        }),
                        t
                    );
                }),
                (e.prototype.getNextNode = function (e) {
                    if ((void 0 === e && (e = !0), e && this.hasChildren() && this.is_open)) return this.children[0];
                    if (this.parent) {
                        var t = this.getNextSibling();
                        return t || this.parent.getNextNode(!1);
                    }
                    return null;
                }),
                (e.prototype.getPreviousNode = function () {
                    if (this.parent) {
                        var e = this.getPreviousSibling();
                        return e ? (e.hasChildren() && e.is_open ? e.getLastChild() : e) : this.getParent();
                    }
                    return null;
                }),
                (e.prototype.getParent = function () {
                    return this.parent && this.parent.parent ? this.parent : null;
                }),
                (e.prototype.getLastChild = function () {
                    if (this.hasChildren()) {
                        var e = this.children[this.children.length - 1];
                        return e.hasChildren() && e.is_open ? e.getLastChild() : e;
                    }
                    return null;
                }),
                (e.prototype.initFromData = function (e) {
                    var t,
                        o = this,
                        n = function (e) {
                            for (var t = 0, n = e; t < n.length; t++) {
                                var r = n[t],
                                    i = o.createNode();
                                i.initFromData(r), o.addChild(i);
                            }
                        };
                    (t = e), o.setData(t), "object" == typeof t && t.children && t.children instanceof Array && t.children.length && n(t.children);
                }),
                (e.prototype.setParent = function (e) {
                    var t;
                    (this.parent = e), (this.tree = e.tree), null === (t = this.tree) || void 0 === t || t.addNodeToIndex(this);
                }),
                (e.prototype.doRemoveChild = function (e) {
                    var t;
                    this.children.splice(this.getChildIndex(e), 1), null === (t = this.tree) || void 0 === t || t.removeNodeFromIndex(e);
                }),
                (e.prototype.getNodeClass = function () {
                    var t;
                    return this.nodeClass || (null === (t = null == this ? void 0 : this.tree) || void 0 === t ? void 0 : t.nodeClass) || e;
                }),
                (e.prototype.createNode = function (e) {
                    return new (this.getNodeClass())(e);
                }),
                e
            );
        })(),
        c = r.default || i,
        f = (function () {
            function e(e) {
                (this.treeWidget = e), (this.hoveredArea = null), (this.hitAreas = []), (this.isDragging = !1), (this.currentItem = null), (this.positionInfo = null);
            }
            return (
                (e.prototype.mouseCapture = function (e) {
                    var t = c(e.target);
                    if (!this.mustCaptureElement(t)) return null;
                    if (this.treeWidget.options.onIsMoveHandle && !this.treeWidget.options.onIsMoveHandle(t)) return null;
                    var o = this.treeWidget._getNodeElement(t);
                    return o && this.treeWidget.options.onCanMove && (this.treeWidget.options.onCanMove(o.node) || (o = null)), (this.currentItem = o), null != this.currentItem;
                }),
                (e.prototype.mouseStart = function (e) {
                    var t;
                    if (!this.currentItem || void 0 === e.pageX || void 0 === e.pageY) return !1;
                    this.refresh();
                    var o = c(e.target).offset(),
                        n = o ? o.left : 0,
                        r = o ? o.top : 0,
                        i = this.currentItem.node;
                    return (
                        (this.dragElement = new m(i.name, e.pageX - n, e.pageY - r, this.treeWidget.element, null === (t = this.treeWidget.options.autoEscape) || void 0 === t || t)),
                        (this.isDragging = !0),
                        (this.positionInfo = e),
                        this.currentItem.$element.addClass("jqtree-moving"),
                        !0
                    );
                }),
                (e.prototype.mouseDrag = function (e) {
                    if (!this.currentItem || !this.dragElement || void 0 === e.pageX || void 0 === e.pageY) return !1;
                    this.dragElement.move(e.pageX, e.pageY), (this.positionInfo = e);
                    var t = this.findHoveredArea(e.pageX, e.pageY);
                    return (
                        t && this.canMoveToArea(t)
                            ? (t.node.isFolder() || this.stopOpenFolderTimer(),
                              this.hoveredArea !== t && ((this.hoveredArea = t), this.mustOpenFolderTimer(t) ? this.startOpenFolderTimer(t.node) : this.stopOpenFolderTimer(), this.updateDropHint()))
                            : (this.removeDropHint(), this.stopOpenFolderTimer(), (this.hoveredArea = t)),
                        t || (this.treeWidget.options.onDragMove && this.treeWidget.options.onDragMove(this.currentItem.node, e.originalEvent)),
                        !0
                    );
                }),
                (e.prototype.mouseStop = function (e) {
                    this.moveItem(e), this.clear(), this.removeHover(), this.removeDropHint(), this.removeHitAreas();
                    var t = this.currentItem;
                    return (
                        this.currentItem && (this.currentItem.$element.removeClass("jqtree-moving"), (this.currentItem = null)),
                        (this.isDragging = !1),
                        (this.positionInfo = null),
                        !this.hoveredArea && t && this.treeWidget.options.onDragStop && this.treeWidget.options.onDragStop(t.node, e.originalEvent),
                        !1
                    );
                }),
                (e.prototype.refresh = function () {
                    this.removeHitAreas(),
                        this.currentItem && (this.generateHitAreas(), (this.currentItem = this.treeWidget._getNodeElementForNode(this.currentItem.node)), this.isDragging && this.currentItem.$element.addClass("jqtree-moving"));
                }),
                (e.prototype.generateHitAreas = function () {
                    if (this.currentItem) {
                        var e = new g(this.treeWidget.tree, this.currentItem.node, this.getTreeDimensions().bottom);
                        this.hitAreas = e.generate();
                    } else this.hitAreas = [];
                }),
                (e.prototype.mustCaptureElement = function (e) {
                    return !e.is("input,select,textarea");
                }),
                (e.prototype.canMoveToArea = function (e) {
                    if (!this.treeWidget.options.onCanMoveTo) return !0;
                    if (!this.currentItem) return !1;
                    var t = u(e.position);
                    return this.treeWidget.options.onCanMoveTo(this.currentItem.node, e.node, t);
                }),
                (e.prototype.removeHitAreas = function () {
                    this.hitAreas = [];
                }),
                (e.prototype.clear = function () {
                    this.dragElement && (this.dragElement.remove(), (this.dragElement = null));
                }),
                (e.prototype.removeDropHint = function () {
                    this.previousGhost && this.previousGhost.remove();
                }),
                (e.prototype.removeHover = function () {
                    this.hoveredArea = null;
                }),
                (e.prototype.findHoveredArea = function (e, t) {
                    var o = this.getTreeDimensions();
                    if (e < o.left || t < o.top || e > o.right || t > o.bottom) return null;
                    for (var n = 0, r = this.hitAreas.length; n < r; ) {
                        var i = (n + r) >> 1,
                            s = this.hitAreas[i];
                        if (t < s.top) r = i;
                        else {
                            if (!(t > s.bottom)) return s;
                            n = i + 1;
                        }
                    }
                    return null;
                }),
                (e.prototype.mustOpenFolderTimer = function (e) {
                    var t = e.node;
                    return t.isFolder() && !t.is_open && e.position === l.Inside;
                }),
                (e.prototype.updateDropHint = function () {
                    if (this.hoveredArea) {
                        this.removeDropHint();
                        var e = this.treeWidget._getNodeElementForNode(this.hoveredArea.node);
                        this.previousGhost = e.addDropHint(this.hoveredArea.position);
                    }
                }),
                (e.prototype.startOpenFolderTimer = function (e) {
                    var t = this;
                    this.stopOpenFolderTimer(),
                        (this.openFolderTimer = window.setTimeout(function () {
                            t.treeWidget._openNode(e, t.treeWidget.options.slide, function () {
                                t.refresh(), t.updateDropHint();
                            });
                        }, this.treeWidget.options.openFolderDelay));
                }),
                (e.prototype.stopOpenFolderTimer = function () {
                    this.openFolderTimer && (clearTimeout(this.openFolderTimer), (this.openFolderTimer = null));
                }),
                (e.prototype.moveItem = function (e) {
                    var t = this;
                    if (this.currentItem && this.hoveredArea && this.hoveredArea.position !== l.None && this.canMoveToArea(this.hoveredArea)) {
                        var o = this.currentItem.node,
                            n = this.hoveredArea.node,
                            r = this.hoveredArea.position,
                            i = o.parent;
                        r === l.Inside && (this.hoveredArea.node.is_open = !0);
                        var s = function () {
                            t.treeWidget.tree.moveNode(o, n, r), t.treeWidget.element.empty(), t.treeWidget._refreshElements(null);
                        };
                        this.treeWidget._triggerEvent("tree.move", { move_info: { moved_node: o, target_node: n, position: u(r), previous_parent: i, do_move: s, original_event: e.originalEvent } }).isDefaultPrevented() || s();
                    }
                }),
                (e.prototype.getTreeDimensions = function () {
                    var e = this.treeWidget.element.offset();
                    if (e) {
                        var t = this.treeWidget.element,
                            o = t.width() || 0,
                            n = t.height() || 0,
                            r = e.left + this.treeWidget._getScrollLeft();
                        return { left: r, top: e.top, right: r + o, bottom: e.top + n + 16 };
                    }
                    return { left: 0, top: 0, right: 0, bottom: 0 };
                }),
                e
            );
        })(),
        g = (function (e) {
            function t(t, o, n) {
                var r = e.call(this, t) || this;
                return (r.currentNode = o), (r.treeBottom = n), r;
            }
            return (
                a(t, e),
                (t.prototype.generate = function () {
                    return (this.positions = []), (this.lastTop = 0), this.iterate(), this.generateHitAreas(this.positions);
                }),
                (t.prototype.generateHitAreas = function (e) {
                    for (var t = -1, o = [], n = [], r = 0, i = e; r < i.length; r++) {
                        var s = i[r];
                        s.top !== t && o.length && (o.length && this.generateHitAreasForGroup(n, o, t, s.top), (t = s.top), (o = [])), o.push(s);
                    }
                    return this.generateHitAreasForGroup(n, o, t, this.treeBottom), n;
                }),
                (t.prototype.handleOpenFolder = function (e, t) {
                    return e !== this.currentNode && (e.children[0] !== this.currentNode && this.addPosition(e, l.Inside, this.getTop(t)), !0);
                }),
                (t.prototype.handleClosedFolder = function (e, t, o) {
                    var n = this.getTop(o);
                    e === this.currentNode ? this.addPosition(e, l.None, n) : (this.addPosition(e, l.Inside, n), t !== this.currentNode && this.addPosition(e, l.After, n));
                }),
                (t.prototype.handleFirstNode = function (e) {
                    e !== this.currentNode && this.addPosition(e, l.Before, this.getTop(c(e.element)));
                }),
                (t.prototype.handleAfterOpenFolder = function (e, t) {
                    e === this.currentNode || t === this.currentNode ? this.addPosition(e, l.None, this.lastTop) : this.addPosition(e, l.After, this.lastTop);
                }),
                (t.prototype.handleNode = function (e, t, o) {
                    var n = this.getTop(o);
                    e === this.currentNode ? this.addPosition(e, l.None, n) : this.addPosition(e, l.Inside, n), t === this.currentNode || e === this.currentNode ? this.addPosition(e, l.None, n) : this.addPosition(e, l.After, n);
                }),
                (t.prototype.getTop = function (e) {
                    var t = e.offset();
                    return t ? t.top : 0;
                }),
                (t.prototype.addPosition = function (e, t, o) {
                    var n = { top: o, bottom: 0, node: e, position: t };
                    this.positions.push(n), (this.lastTop = o);
                }),
                (t.prototype.generateHitAreasForGroup = function (e, t, o, n) {
                    for (var r = Math.min(t.length, 4), i = Math.round((n - o) / r), s = o, a = 0; a < r; ) {
                        var l = t[a];
                        e.push({ top: s, bottom: s + i, node: l.node, position: l.position }), (s += i), (a += 1);
                    }
                }),
                t
            );
        })(
            (function () {
                function e(e) {
                    this.tree = e;
                }
                return (
                    (e.prototype.iterate = function () {
                        var e = this,
                            t = !0,
                            o = function (n, r) {
                                var i = (n.is_open || !n.element) && n.hasChildren(),
                                    s = null;
                                if (n.element) {
                                    if (!(s = c(n.element)).is(":visible")) return;
                                    t && (e.handleFirstNode(n), (t = !1)), n.hasChildren() ? (n.is_open ? e.handleOpenFolder(n, s) || (i = !1) : e.handleClosedFolder(n, r, s)) : e.handleNode(n, r, s);
                                }
                                if (i) {
                                    var a = n.children.length;
                                    n.children.forEach(function (e, t) {
                                        o(n.children[t], t === a - 1 ? null : n.children[t + 1]);
                                    }),
                                        n.is_open && s && e.handleAfterOpenFolder(n, r);
                                }
                            };
                        o(this.tree, null);
                    }),
                    e
                );
            })()
        ),
        m = (function () {
            function e(e, t, o, n, r) {
                (this.offsetX = t),
                    (this.offsetY = o),
                    (this.$element = c("<span>").addClass("jqtree-title jqtree-dragging")),
                    r ? this.$element.text(e) : this.$element.html(e),
                    this.$element.css("position", "absolute"),
                    n.append(this.$element);
            }
            return (
                (e.prototype.move = function (e, t) {
                    this.$element.offset({ left: e - this.offsetX, top: t - this.offsetY });
                }),
                (e.prototype.remove = function () {
                    this.$element.remove();
                }),
                e
            );
        })(),
        v = function (e) {
            return e ? "true" : "false";
        },
        y = (function () {
            function e(e) {
                (this.treeWidget = e), (this.openedIconElement = this.createButtonElement(e.options.openedIcon || "+")), (this.closedIconElement = this.createButtonElement(e.options.closedIcon || "-"));
            }
            return (
                (e.prototype.render = function (e) {
                    e && e.parent ? this.renderFromNode(e) : this.renderFromRoot();
                }),
                (e.prototype.renderFromRoot = function () {
                    var e = this.treeWidget.element;
                    e.empty(), this.createDomElements(e[0], this.treeWidget.tree.children, !0, 1);
                }),
                (e.prototype.renderFromNode = function (e) {
                    var t = jQuery(e.element),
                        o = this.createLi(e, e.getLevel());
                    this.attachNodeData(e, o), t.after(o), t.remove(), e.children && this.createDomElements(o, e.children, !1, e.getLevel() + 1);
                }),
                (e.prototype.createDomElements = function (e, t, o, n) {
                    var r = this.createUl(o);
                    e.appendChild(r);
                    for (var i = 0, s = t; i < s.length; i++) {
                        var a = s[i],
                            l = this.createLi(a, n);
                        r.appendChild(l), this.attachNodeData(a, l), a.hasChildren() && this.createDomElements(l, a.children, !1, n + 1);
                    }
                }),
                (e.prototype.attachNodeData = function (e, t) {
                    (e.element = t), jQuery(t).data("node", e);
                }),
                (e.prototype.createUl = function (e) {
                    var t, o;
                    e ? ((t = "jqtree-tree"), (o = "tree"), this.treeWidget.options.rtl && (t += " jqtree-rtl")) : ((t = ""), (o = "group")), this.treeWidget.options.dragAndDrop && (t += " jqtree-dnd");
                    var n = document.createElement("ul");
                    return (n.className = "jqtree_common " + t), n.setAttribute("role", o), n;
                }),
                (e.prototype.createLi = function (e, t) {
                    var o = Boolean(this.treeWidget.selectNodeHandler.isNodeSelected(e)),
                        n = e.isFolder() || (e.isEmptyFolder && this.treeWidget.options.showEmptyFolder) ? this.createFolderLi(e, t, o) : this.createNodeLi(e, t, o);
                    return this.treeWidget.options.onCreateLi && this.treeWidget.options.onCreateLi(e, jQuery(n), o), n;
                }),
                (e.prototype.createFolderLi = function (e, t, o) {
                    var n = this.getButtonClasses(e),
                        r = this.getFolderClasses(e, o),
                        i = e.is_open ? this.openedIconElement : this.closedIconElement,
                        s = document.createElement("li");
                    (s.className = "jqtree_common " + r), s.setAttribute("role", "presentation");
                    var a = document.createElement("div");
                    (a.className = "jqtree-element jqtree_common"), a.setAttribute("role", "presentation"), s.appendChild(a);
                    var l = document.createElement("a");
                    return (
                        (l.className = n),
                        l.appendChild(i.cloneNode(!0)),
                        l.setAttribute("role", "presentation"),
                        l.setAttribute("aria-hidden", "true"),
                        this.treeWidget.options.buttonLeft && a.appendChild(l),
                        a.appendChild(this.createTitleSpan(e.name, t, o, e.is_open, !0)),
                        this.treeWidget.options.buttonLeft || a.appendChild(l),
                        s
                    );
                }),
                (e.prototype.createNodeLi = function (e, t, o) {
                    var n = ["jqtree_common"];
                    o && n.push("jqtree-selected");
                    var r = n.join(" "),
                        i = document.createElement("li");
                    (i.className = r), i.setAttribute("role", "presentation");
                    var s = document.createElement("div");
                    return (s.className = "jqtree-element jqtree_common"), s.setAttribute("role", "presentation"), i.appendChild(s), s.appendChild(this.createTitleSpan(e.name, t, o, e.is_open, !1)), i;
                }),
                (e.prototype.createTitleSpan = function (e, t, o, n, r) {
                    var i = document.createElement("span"),
                        s = "jqtree-title jqtree_common";
                    if ((r && (s += " jqtree-title-folder"), (i.className = s), i.setAttribute("role", "treeitem"), i.setAttribute("aria-level", "" + t), i.setAttribute("aria-selected", v(o)), i.setAttribute("aria-expanded", v(n)), o)) {
                        var a = this.treeWidget.options.tabIndex;
                        void 0 !== a && i.setAttribute("tabindex", "" + a);
                    }
                    return this.treeWidget.options.autoEscape ? (i.textContent = e) : (i.innerHTML = e), i;
                }),
                (e.prototype.getButtonClasses = function (e) {
                    var t = ["jqtree-toggler", "jqtree_common"];
                    return e.is_open || t.push("jqtree-closed"), this.treeWidget.options.buttonLeft ? t.push("jqtree-toggler-left") : t.push("jqtree-toggler-right"), t.join(" ");
                }),
                (e.prototype.getFolderClasses = function (e, t) {
                    var o = ["jqtree-folder"];
                    return e.is_open || o.push("jqtree-closed"), t && o.push("jqtree-selected"), e.is_loading && o.push("jqtree-loading"), o.join(" ");
                }),
                (e.prototype.createButtonElement = function (e) {
                    if ("string" == typeof e) {
                        var t = document.createElement("div");
                        return (t.innerHTML = e), document.createTextNode(t.innerHTML);
                    }
                    return jQuery(e)[0];
                }),
                e
            );
        })(),
        N = (function () {
            function e(e) {
                this.treeWidget = e;
            }
            return (
                (e.prototype.loadFromUrl = function (e, t, o) {
                    var n = this;
                    if (e) {
                        var r = this.getDomElement(t);
                        this.addLoadingClass(r), this.notifyLoading(!0, t, r);
                        var i = function () {
                            n.removeLoadingClass(r), n.notifyLoading(!1, t, r);
                        };
                        this.submitRequest(
                            e,
                            function (e) {
                                i(), n.treeWidget.loadData(n.parseData(e), t), o && "function" == typeof o && o();
                            },
                            function (e) {
                                i(), n.treeWidget.options.onLoadFailed && n.treeWidget.options.onLoadFailed(e);
                            }
                        );
                    }
                }),
                (e.prototype.addLoadingClass = function (e) {
                    e && e.addClass("jqtree-loading");
                }),
                (e.prototype.removeLoadingClass = function (e) {
                    e && e.removeClass("jqtree-loading");
                }),
                (e.prototype.getDomElement = function (e) {
                    return e ? jQuery(e.element) : this.treeWidget.element;
                }),
                (e.prototype.notifyLoading = function (e, t, o) {
                    this.treeWidget.options.onLoading && this.treeWidget.options.onLoading(e, t, o), this.treeWidget._triggerEvent("tree.loading_data", { isLoading: e, node: t, $el: o });
                }),
                (e.prototype.submitRequest = function (e, t, o) {
                    var n,
                        r = d({ method: "GET", cache: !1, dataType: "json", success: t, error: o }, "string" == typeof e ? { url: e } : e);
                    (r.method = (null === (n = r.method) || void 0 === n ? void 0 : n.toUpperCase()) || "GET"), jQuery.ajax(r);
                }),
                (e.prototype.parseData = function (e) {
                    var t = this.treeWidget.options.dataFilter,
                        o = "string" == typeof e ? JSON.parse(e) : e;
                    return t ? t(o) : o;
                }),
                e
            );
        })(),
        S = (function () {
            function e(t) {
                var o = this;
                (this.handleKeyDown = function (t) {
                    if (!o.canHandleKeyboard()) return !0;
                    var n = o.treeWidget.getSelectedNode();
                    if (!n) return !0;
                    switch (t.which) {
                        case e.DOWN:
                            return o.moveDown(n);
                        case e.UP:
                            return o.moveUp(n);
                        case e.RIGHT:
                            return o.moveRight(n);
                        case e.LEFT:
                            return o.moveLeft(n);
                        default:
                            return !0;
                    }
                }),
                    (this.treeWidget = t),
                    t.options.keyboardSupport && jQuery(document).on("keydown.jqtree", this.handleKeyDown);
            }
            return (
                (e.prototype.deinit = function () {
                    jQuery(document).off("keydown.jqtree");
                }),
                (e.prototype.moveDown = function (e) {
                    return this.selectNode(e.getNextNode());
                }),
                (e.prototype.moveUp = function (e) {
                    return this.selectNode(e.getPreviousNode());
                }),
                (e.prototype.moveRight = function (e) {
                    return !e.isFolder() || (e.is_open ? this.selectNode(e.getNextNode()) : (this.treeWidget.openNode(e), !1));
                }),
                (e.prototype.moveLeft = function (e) {
                    return e.isFolder() && e.is_open ? (this.treeWidget.closeNode(e), !1) : this.selectNode(e.getParent());
                }),
                (e.prototype.selectNode = function (e) {
                    return !e || (this.treeWidget.selectNode(e), this.treeWidget.scrollHandler.isScrolledIntoView(jQuery(e.element).find(".jqtree-element")) || this.treeWidget.scrollToNode(e), !1);
                }),
                (e.prototype.canHandleKeyboard = function () {
                    return !!this.treeWidget.options.keyboardSupport && this.treeWidget.selectNodeHandler.isFocusOnTree();
                }),
                (e.LEFT = 37),
                (e.UP = 38),
                (e.RIGHT = 39),
                (e.DOWN = 40),
                e
            );
        })(),
        _ = function (e, t) {
            var o = function () {
                    return "simple_widget_" + t;
                },
                n = function (e, t) {
                    var o = jQuery.data(e, t);
                    return o && o instanceof D ? o : null;
                },
                r = function (t, r) {
                    for (var i = o(), s = 0, a = t.get(); s < a.length; s++) {
                        var l = a[s];
                        if (!n(l, i)) {
                            var d = new e(l, r);
                            jQuery.data(l, i) || jQuery.data(l, i, d), d.init();
                        }
                    }
                    return t;
                },
                i = function (e) {
                    for (var t = o(), r = 0, i = e.get(); r < i.length; r++) {
                        var s = i[r],
                            a = n(s, t);
                        a && a.destroy(), jQuery.removeData(s, t);
                    }
                },
                s = function (e, t, n) {
                    for (var r = null, i = 0, s = e.get(); i < s.length; i++) {
                        var a = s[i],
                            l = jQuery.data(a, o());
                        if (l && l instanceof D) {
                            var d = l[t];
                            d && "function" == typeof d && (r = d.apply(l, n));
                        }
                    }
                    return r;
                };
            jQuery.fn[t] = function (t) {
                for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
                if (!t) return r(this, null);
                if ("object" == typeof t) {
                    var a = t;
                    return r(this, a);
                }
                if ("string" == typeof t && "_" !== t[0]) {
                    var l = t;
                    return "destroy" === l ? i(this) : "get_widget_class" === l ? e : s(this, l, o);
                }
            };
        },
        D = (function () {
            function e(e, t) {
                this.$el = jQuery(e);
                var o = this.constructor.defaults;
                this.options = d(d({}, o), t);
            }
            return (
                (e.register = function (e, t) {
                    _(e, t);
                }),
                (e.prototype.destroy = function () {
                    this.deinit();
                }),
                (e.prototype.init = function () {}),
                (e.prototype.deinit = function () {}),
                (e.defaults = {}),
                e
            );
        })(),
        I = function (e) {
            return { pageX: e.pageX, pageY: e.pageY, target: e.target, originalEvent: e };
        },
        E = function (e, t) {
            return { pageX: e.pageX, pageY: e.pageY, target: e.target, originalEvent: t };
        },
        C = (function (e) {
            function t() {
                var t = (null !== e && e.apply(this, arguments)) || this;
                return (
                    (t.mouseDown = function (e) {
                        0 === e.button && t.handleMouseDown(I(e)) && e.cancelable && e.preventDefault();
                    }),
                    (t.mouseMove = function (e) {
                        t.handleMouseMove(e, I(e));
                    }),
                    (t.mouseUp = function (e) {
                        t.handleMouseUp(I(e));
                    }),
                    (t.touchStart = function (e) {
                        if (e && !(e.touches.length > 1)) {
                            var o = e.changedTouches[0];
                            t.handleMouseDown(E(o, e));
                        }
                    }),
                    (t.touchMove = function (e) {
                        if (e && !(e.touches.length > 1)) {
                            var o = e.changedTouches[0];
                            t.handleMouseMove(e, E(o, e));
                        }
                    }),
                    (t.touchEnd = function (e) {
                        if (e && !(e.touches.length > 1)) {
                            var o = e.changedTouches[0];
                            t.handleMouseUp(E(o, e));
                        }
                    }),
                    t
                );
            }
            return (
                a(t, e),
                (t.prototype.setMouseDelay = function (e) {
                    this.mouseDelay = e;
                }),
                (t.prototype.init = function () {
                    var e = this.$el.get(0);
                    e.addEventListener("mousedown", this.mouseDown, { passive: !1 }),
                        e.addEventListener("touchstart", this.touchStart, { passive: !1 }),
                        (this.isMouseStarted = !1),
                        (this.mouseDelay = 0),
                        (this.mouseDelayTimer = null),
                        (this.isMouseDelayMet = !1),
                        (this.mouseDownInfo = null);
                }),
                (t.prototype.deinit = function () {
                    var e = this.$el.get(0);
                    e.removeEventListener("mousedown", this.mouseDown),
                        e.removeEventListener("touchstart", this.touchStart),
                        document.removeEventListener("mousemove", this.mouseMove),
                        document.removeEventListener("touchmove", this.touchMove),
                        document.removeEventListener("mouseup", this.mouseUp),
                        document.removeEventListener("touchend", this.touchEnd);
                }),
                (t.prototype.handleMouseDown = function (e) {
                    return this.isMouseStarted && this.handleMouseUp(e), (this.mouseDownInfo = e), !!this.mouseCapture(e) && (this.handleStartMouse(), !0);
                }),
                (t.prototype.handleStartMouse = function () {
                    document.addEventListener("mousemove", this.mouseMove, { passive: !1 }),
                        document.addEventListener("touchmove", this.touchMove, { passive: !1 }),
                        document.addEventListener("mouseup", this.mouseUp, { passive: !1 }),
                        document.addEventListener("touchend", this.touchEnd, { passive: !1 }),
                        this.mouseDelay && this.startMouseDelayTimer();
                }),
                (t.prototype.startMouseDelayTimer = function () {
                    var e = this;
                    this.mouseDelayTimer && clearTimeout(this.mouseDelayTimer),
                        (this.mouseDelayTimer = window.setTimeout(function () {
                            e.isMouseDelayMet = !0;
                        }, this.mouseDelay)),
                        (this.isMouseDelayMet = !1);
                }),
                (t.prototype.handleMouseMove = function (e, t) {
                    if (this.isMouseStarted) return this.mouseDrag(t), void (e.cancelable && e.preventDefault());
                    (this.mouseDelay && !this.isMouseDelayMet) ||
                        (this.mouseDownInfo && (this.isMouseStarted = !1 !== this.mouseStart(this.mouseDownInfo)), this.isMouseStarted ? (this.mouseDrag(t), e.cancelable && e.preventDefault()) : this.handleMouseUp(t));
                }),
                (t.prototype.handleMouseUp = function (e) {
                    document.removeEventListener("mousemove", this.mouseMove),
                        document.removeEventListener("touchmove", this.touchMove),
                        document.removeEventListener("mouseup", this.mouseUp),
                        document.removeEventListener("touchend", this.touchEnd),
                        this.isMouseStarted && ((this.isMouseStarted = !1), this.mouseStop(e));
                }),
                t
            );
        })(D),
        j = (function () {
            function e(e) {
                this.treeWidget = e;
            }
            return (
                (e.prototype.saveState = function () {
                    var e = JSON.stringify(this.getState());
                    this.treeWidget.options.onSetStateFromStorage ? this.treeWidget.options.onSetStateFromStorage(e) : this.supportsLocalStorage() && localStorage.setItem(this.getKeyName(), e);
                }),
                (e.prototype.getStateFromStorage = function () {
                    var e = this.loadFromStorage();
                    return e ? this.parseState(e) : null;
                }),
                (e.prototype.getState = function () {
                    var e,
                        t,
                        o = this;
                    return {
                        open_nodes:
                            ((t = []),
                            o.treeWidget.tree.iterate(function (e) {
                                return e.is_open && e.id && e.hasChildren() && t.push(e.id), !0;
                            }),
                            t),
                        selected_node:
                            ((e = []),
                            o.treeWidget.getSelectedNodes().forEach(function (t) {
                                null != t.id && e.push(t.id);
                            }),
                            e),
                    };
                }),
                (e.prototype.setInitialState = function (e) {
                    if (e) {
                        var t = !1;
                        return e.open_nodes && (t = this.openInitialNodes(e.open_nodes)), e.selected_node && (this.resetSelection(), this.selectInitialNodes(e.selected_node)), t;
                    }
                    return !1;
                }),
                (e.prototype.setInitialStateOnDemand = function (e, t) {
                    e ? this.doSetInitialStateOnDemand(e.open_nodes, e.selected_node, t) : t();
                }),
                (e.prototype.getNodeIdToBeSelected = function () {
                    var e = this.getStateFromStorage();
                    return e && e.selected_node ? e.selected_node[0] : null;
                }),
                (e.prototype.parseState = function (e) {
                    var t,
                        o = JSON.parse(e);
                    return o && o.selected_node && "number" == typeof (t = o.selected_node) && t % 1 == 0 && (o.selected_node = [o.selected_node]), o;
                }),
                (e.prototype.loadFromStorage = function () {
                    return this.treeWidget.options.onGetStateFromStorage ? this.treeWidget.options.onGetStateFromStorage() : this.supportsLocalStorage() ? localStorage.getItem(this.getKeyName()) : null;
                }),
                (e.prototype.openInitialNodes = function (e) {
                    for (var t = !1, o = 0, n = e; o < n.length; o++) {
                        var r = n[o],
                            i = this.treeWidget.getNodeById(r);
                        i && (i.load_on_demand ? (t = !0) : (i.is_open = !0));
                    }
                    return t;
                }),
                (e.prototype.selectInitialNodes = function (e) {
                    for (var t = 0, o = 0, n = e; o < n.length; o++) {
                        var r = n[o],
                            i = this.treeWidget.getNodeById(r);
                        i && ((t += 1), this.treeWidget.selectNodeHandler.addToSelection(i));
                    }
                    return 0 !== t;
                }),
                (e.prototype.resetSelection = function () {
                    var e = this.treeWidget.selectNodeHandler;
                    e.getSelectedNodes().forEach(function (t) {
                        e.removeFromSelection(t);
                    });
                }),
                (e.prototype.doSetInitialStateOnDemand = function (e, t, o) {
                    var n = this,
                        r = 0,
                        i = e,
                        s = function () {
                            for (var e = [], s = 0, l = i; s < l.length; s++) {
                                var d = l[s],
                                    h = n.treeWidget.getNodeById(d);
                                h ? h.is_loading || (h.load_on_demand ? a(h) : n.treeWidget._openNode(h, !1, null)) : e.push(d);
                            }
                            (i = e), n.selectInitialNodes(t) && n.treeWidget._refreshElements(null), 0 === r && o();
                        },
                        a = function (e) {
                            (r += 1),
                                n.treeWidget._openNode(e, !1, function () {
                                    (r -= 1), s();
                                });
                        };
                    s();
                }),
                (e.prototype.getKeyName = function () {
                    return "string" == typeof this.treeWidget.options.saveState ? this.treeWidget.options.saveState : "tree";
                }),
                (e.prototype.supportsLocalStorage = function () {
                    return (
                        null == this._supportsLocalStorage &&
                            (this._supportsLocalStorage = (function () {
                                if (null == localStorage) return !1;
                                try {
                                    var e = "_storage_test";
                                    sessionStorage.setItem(e, "value"), sessionStorage.removeItem(e);
                                } catch (e) {
                                    return !1;
                                }
                                return !0;
                            })()),
                        this._supportsLocalStorage
                    );
                }),
                e
            );
        })(),
        F = (function () {
            function e(e) {
                (this.treeWidget = e), (this.previousTop = -1), (this.isInitialized = !1);
            }
            return (
                (e.prototype.checkScrolling = function () {
                    this.ensureInit(), this.checkVerticalScrolling(), this.checkHorizontalScrolling();
                }),
                (e.prototype.scrollToY = function (e) {
                    if ((this.ensureInit(), this.$scrollParent)) this.$scrollParent[0].scrollTop = e;
                    else {
                        var t = this.treeWidget.$el.offset(),
                            o = t ? t.top : 0;
                        jQuery(document).scrollTop(e + o);
                    }
                }),
                (e.prototype.isScrolledIntoView = function (e) {
                    var t, o, n, r;
                    this.ensureInit();
                    var i,
                        s = e.height() || 0;
                    this.$scrollParent
                        ? ((r = 0), (o = this.$scrollParent.height() || 0), (t = (n = ((i = e.offset()) ? i.top : 0) - this.scrollParentTop) + s))
                        : ((o = (r = jQuery(window).scrollTop() || 0) + (jQuery(window).height() || 0)), (t = (n = (i = e.offset()) ? i.top : 0) + s));
                    return t <= o && n >= r;
                }),
                (e.prototype.getScrollLeft = function () {
                    return (this.$scrollParent && this.$scrollParent.scrollLeft()) || 0;
                }),
                (e.prototype.initScrollParent = function () {
                    var e = this,
                        t = function () {
                            (e.scrollParentTop = 0), (e.$scrollParent = null);
                        };
                    "fixed" === this.treeWidget.$el.css("position") && t();
                    var o = (function () {
                        var t = ["overflow", "overflow-y"],
                            o = function (e) {
                                for (var o = 0, n = t; o < n.length; o++) {
                                    var r = n[o],
                                        i = e.css(r);
                                    if ("auto" === i || "scroll" === i) return !0;
                                }
                                return !1;
                            };
                        if (o(e.treeWidget.$el)) return e.treeWidget.$el;
                        for (var n = 0, r = e.treeWidget.$el.parents().get(); n < r.length; n++) {
                            var i = r[n],
                                s = jQuery(i);
                            if (o(s)) return s;
                        }
                        return null;
                    })();
                    if (o && o.length && "HTML" !== o[0].tagName) {
                        this.$scrollParent = o;
                        var n = this.$scrollParent.offset();
                        this.scrollParentTop = n ? n.top : 0;
                    } else t();
                    this.isInitialized = !0;
                }),
                (e.prototype.ensureInit = function () {
                    this.isInitialized || this.initScrollParent();
                }),
                (e.prototype.handleVerticalScrollingWithScrollParent = function (e) {
                    var t = this.$scrollParent && this.$scrollParent[0];
                    t &&
                        (this.scrollParentTop + t.offsetHeight - e.bottom < 20
                            ? ((t.scrollTop += 20), this.treeWidget.refreshHitAreas(), (this.previousTop = -1))
                            : e.top - this.scrollParentTop < 20 && ((t.scrollTop -= 20), this.treeWidget.refreshHitAreas(), (this.previousTop = -1)));
                }),
                (e.prototype.handleVerticalScrollingWithDocument = function (e) {
                    var t = jQuery(document).scrollTop() || 0;
                    e.top - t < 20 ? jQuery(document).scrollTop(t - 20) : (jQuery(window).height() || 0) - (e.bottom - t) < 20 && jQuery(document).scrollTop(t + 20);
                }),
                (e.prototype.checkVerticalScrolling = function () {
                    var e = this.treeWidget.dndHandler.hoveredArea;
                    e && e.top !== this.previousTop && ((this.previousTop = e.top), this.$scrollParent ? this.handleVerticalScrollingWithScrollParent(e) : this.handleVerticalScrollingWithDocument(e));
                }),
                (e.prototype.checkHorizontalScrolling = function () {
                    var e = this.treeWidget.dndHandler.positionInfo;
                    e && (this.$scrollParent ? this.handleHorizontalScrollingWithParent(e) : this.handleHorizontalScrollingWithDocument(e));
                }),
                (e.prototype.handleHorizontalScrollingWithParent = function (e) {
                    if (void 0 !== e.pageX && void 0 !== e.pageY) {
                        var t = this.$scrollParent,
                            o = t && t.offset();
                        if (t && o) {
                            var n = t[0],
                                r = n.scrollLeft + n.clientWidth < n.scrollWidth,
                                i = n.scrollLeft > 0,
                                s = o.left + n.clientWidth,
                                a = o.left,
                                l = e.pageX > s - 20,
                                d = e.pageX < a + 20;
                            l && r ? (n.scrollLeft = Math.min(n.scrollLeft + 20, n.scrollWidth)) : d && i && (n.scrollLeft = Math.max(n.scrollLeft - 20, 0));
                        }
                    }
                }),
                (e.prototype.handleHorizontalScrollingWithDocument = function (e) {
                    if (void 0 !== e.pageX && void 0 !== e.pageY) {
                        var t = jQuery(document),
                            o = t.scrollLeft() || 0,
                            n = jQuery(window).width() || 0,
                            r = o > 0,
                            i = e.pageX > n - 20,
                            s = e.pageX - o < 20;
                        i ? t.scrollLeft(o + 20) : s && r && t.scrollLeft(Math.max(o - 20, 0));
                    }
                }),
                e
            );
        })(),
        W = (function () {
            function e(e) {
                (this.treeWidget = e), this.clear();
            }
            return (
                (e.prototype.getSelectedNode = function () {
                    var e = this.getSelectedNodes();
                    return !!e.length && e[0];
                }),
                (e.prototype.getSelectedNodes = function () {
                    if (this.selectedSingleNode) return [this.selectedSingleNode];
                    var e = [];
                    for (var t in this.selectedNodes)
                        if (Object.prototype.hasOwnProperty.call(this.selectedNodes, t)) {
                            var o = this.treeWidget.getNodeById(t);
                            o && e.push(o);
                        }
                    return e;
                }),
                (e.prototype.getSelectedNodesUnder = function (e) {
                    if (this.selectedSingleNode) return e.isParentOf(this.selectedSingleNode) ? [this.selectedSingleNode] : [];
                    var t = [];
                    for (var o in this.selectedNodes)
                        if (Object.prototype.hasOwnProperty.call(this.selectedNodes, o)) {
                            var n = this.treeWidget.getNodeById(o);
                            n && e.isParentOf(n) && t.push(n);
                        }
                    return t;
                }),
                (e.prototype.isNodeSelected = function (e) {
                    return null != e.id ? !!this.selectedNodes[e.id] : !!this.selectedSingleNode && this.selectedSingleNode.element === e.element;
                }),
                (e.prototype.clear = function () {
                    (this.selectedNodes = {}), (this.selectedSingleNode = null);
                }),
                (e.prototype.removeFromSelection = function (e, t) {
                    var o = this;
                    void 0 === t && (t = !1),
                        null == e.id
                            ? this.selectedSingleNode && e.element === this.selectedSingleNode.element && (this.selectedSingleNode = null)
                            : (delete this.selectedNodes[e.id],
                              t &&
                                  e.iterate(function () {
                                      return null != e.id && delete o.selectedNodes[e.id], !0;
                                  }));
                }),
                (e.prototype.addToSelection = function (e) {
                    null != e.id ? (this.selectedNodes[e.id] = !0) : (this.selectedSingleNode = e);
                }),
                (e.prototype.isFocusOnTree = function () {
                    var e = document.activeElement;
                    return Boolean(e && "SPAN" === e.tagName && this.treeWidget._containsElement(e));
                }),
                e
            );
        })(),
        b = (function () {
            function e(e, t) {
                this.init(e, t);
            }
            return (
                (e.prototype.init = function (e, t) {
                    (this.node = e), (this.treeWidget = t), e.element || (e.element = this.treeWidget.element.get(0)), (this.$element = jQuery(e.element));
                }),
                (e.prototype.addDropHint = function (e) {
                    return this.mustShowBorderDropHint(e) ? new L(this.$element, this.treeWidget._getScrollLeft()) : new w(this.node, this.$element, e);
                }),
                (e.prototype.select = function (e) {
                    var t,
                        o = this.getLi();
                    o.addClass("jqtree-selected"), o.attr("aria-selected", "true");
                    var n = this.getSpan();
                    n.attr("tabindex", null !== (t = this.treeWidget.options.tabIndex) && void 0 !== t ? t : null), e && n.trigger("focus");
                }),
                (e.prototype.deselect = function () {
                    var e = this.getLi();
                    e.removeClass("jqtree-selected"), e.attr("aria-selected", "false");
                    var t = this.getSpan();
                    t.removeAttr("tabindex"), t.blur();
                }),
                (e.prototype.getUl = function () {
                    return this.$element.children("ul:first");
                }),
                (e.prototype.getSpan = function () {
                    return this.$element.children(".jqtree-element").find("span.jqtree-title");
                }),
                (e.prototype.getLi = function () {
                    return this.$element;
                }),
                (e.prototype.mustShowBorderDropHint = function (e) {
                    return e === l.Inside;
                }),
                e
            );
        })(),
        T = (function (e) {
            function t() {
                return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
                a(t, e),
                (t.prototype.open = function (e, t, o) {
                    var n = this;
                    if ((void 0 === t && (t = !0), void 0 === o && (o = "fast"), !this.node.is_open)) {
                        this.node.is_open = !0;
                        var r = this.getButton();
                        r.removeClass("jqtree-closed"), r.html("");
                        var i = r.get(0);
                        if (i) {
                            var s = this.treeWidget.renderer.openedIconElement.cloneNode(!0);
                            i.appendChild(s);
                        }
                        var a = function () {
                            n.getLi().removeClass("jqtree-closed"), n.getSpan().attr("aria-expanded", "true"), e && e(n.node), n.treeWidget._triggerEvent("tree.open", { node: n.node });
                        };
                        t ? this.getUl().slideDown(o, a) : (this.getUl().show(), a());
                    }
                }),
                (t.prototype.close = function (e, t) {
                    var o = this;
                    if ((void 0 === e && (e = !0), void 0 === t && (t = "fast"), this.node.is_open)) {
                        this.node.is_open = !1;
                        var n = this.getButton();
                        n.addClass("jqtree-closed"), n.html("");
                        var r = n.get(0);
                        if (r) {
                            var i = this.treeWidget.renderer.closedIconElement.cloneNode(!0);
                            r.appendChild(i);
                        }
                        var s = function () {
                            o.getLi().addClass("jqtree-closed"), o.getSpan().attr("aria-expanded", "false"), o.treeWidget._triggerEvent("tree.close", { node: o.node });
                        };
                        e ? this.getUl().slideUp(t, s) : (this.getUl().hide(), s());
                    }
                }),
                (t.prototype.mustShowBorderDropHint = function (e) {
                    return !this.node.is_open && e === l.Inside;
                }),
                (t.prototype.getButton = function () {
                    return this.$element.children(".jqtree-element").find("a.jqtree-toggler");
                }),
                t
            );
        })(b),
        L = (function () {
            function e(e, t) {
                var o = e.children(".jqtree-element"),
                    n = e.width() || 0,
                    r = Math.max(n + t - 4, 0),
                    i = o.outerHeight() || 0,
                    s = Math.max(i - 4, 0);
                (this.$hint = jQuery('<span class="jqtree-border"></span>')), o.append(this.$hint), this.$hint.css({ width: r, height: s });
            }
            return (
                (e.prototype.remove = function () {
                    this.$hint.remove();
                }),
                e
            );
        })(),
        w = (function () {
            function e(e, t, o) {
                (this.$element = t),
                    (this.node = e),
                    (this.$ghost = jQuery('<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span>\n            <span class="jqtree_common jqtree-line"></span></li>')),
                    o === l.After ? this.moveAfter() : o === l.Before ? this.moveBefore() : o === l.Inside && (e.isFolder() && e.is_open ? this.moveInsideOpenFolder() : this.moveInside());
            }
            return (
                (e.prototype.remove = function () {
                    this.$ghost.remove();
                }),
                (e.prototype.moveAfter = function () {
                    this.$element.after(this.$ghost);
                }),
                (e.prototype.moveBefore = function () {
                    this.$element.before(this.$ghost);
                }),
                (e.prototype.moveInsideOpenFolder = function () {
                    jQuery(this.node.children[0].element).before(this.$ghost);
                }),
                (e.prototype.moveInside = function () {
                    this.$element.after(this.$ghost), this.$ghost.addClass("jqtree-inside");
                }),
                e
            );
        })(),
        H = r.default || i,
        A = "Node parameter is empty",
        P = "Parameter is empty: ",
        M = (function (e) {
            function t() {
                var t = (null !== e && e.apply(this, arguments)) || this;
                return (
                    (t.handleClick = function (e) {
                        var o = t.getClickTarget(e.target);
                        if (o)
                            if ("button" === o.type) t.toggle(o.node, t.options.slide), e.preventDefault(), e.stopPropagation();
                            else if ("label" === o.type) {
                                var n = o.node;
                                t._triggerEvent("tree.click", { node: n, click_event: e }).isDefaultPrevented() || t.doSelectNode(n);
                            }
                    }),
                    (t.handleDblclick = function (e) {
                        var o = t.getClickTarget(e.target);
                        "label" === (null == o ? void 0 : o.type) && t._triggerEvent("tree.dblclick", { node: o.node, click_event: e });
                    }),
                    (t.handleContextmenu = function (e) {
                        var o = H(e.target).closest("ul.jqtree-tree .jqtree-element");
                        if (o.length) {
                            var n = t.getNode(o);
                            if (n) return e.preventDefault(), e.stopPropagation(), t._triggerEvent("tree.contextmenu", { node: n, click_event: e }), !1;
                        }
                        return null;
                    }),
                    t
                );
            }
            return (
                a(t, e),
                (t.prototype.toggle = function (e, t) {
                    if ((void 0 === t && (t = null), !e)) throw Error(A);
                    var o = null != t ? t : this.options.slide;
                    return e.is_open ? this.closeNode(e, o) : this.openNode(e, o), this.element;
                }),
                (t.prototype.getTree = function () {
                    return this.tree;
                }),
                (t.prototype.selectNode = function (e, t) {
                    return this.doSelectNode(e, t), this.element;
                }),
                (t.prototype.getSelectedNode = function () {
                    return this.selectNodeHandler.getSelectedNode();
                }),
                (t.prototype.toJson = function () {
                    return JSON.stringify(this.tree.getData());
                }),
                (t.prototype.loadData = function (e, t) {
                    return this.doLoadData(e, t), this.element;
                }),
                (t.prototype.loadDataFromUrl = function (e, t, o) {
                    return "string" == typeof e ? this.doLoadDataFromUrl(e, t, null != o ? o : null) : this.doLoadDataFromUrl(null, e, t), this.element;
                }),
                (t.prototype.reload = function (e) {
                    return this.doLoadDataFromUrl(null, null, e), this.element;
                }),
                (t.prototype.getNodeById = function (e) {
                    return this.tree.getNodeById(e);
                }),
                (t.prototype.getNodeByName = function (e) {
                    return this.tree.getNodeByName(e);
                }),
                (t.prototype.getNodeByNameMustExist = function (e) {
                    return this.tree.getNodeByNameMustExist(e);
                }),
                (t.prototype.getNodesByProperty = function (e, t) {
                    return this.tree.getNodesByProperty(e, t);
                }),
                (t.prototype.getNodeByHtmlElement = function (e) {
                    return this.getNode(H(e));
                }),
                (t.prototype.getNodeByCallback = function (e) {
                    return this.tree.getNodeByCallback(e);
                }),
                (t.prototype.openNode = function (e, t, o) {
                    var n = this;
                    if (!e) throw Error(A);
                    var r = (function () {
                            var e, r, i;
                            return "function" == typeof t ? ((r = t), (i = null)) : ((i = t), (r = o)), null == i && (i = null !== (e = n.options.slide) && void 0 !== e && e), [i, r];
                        })(),
                        i = r[0],
                        s = r[1];
                    return this._openNode(e, i, s), this.element;
                }),
                (t.prototype.closeNode = function (e, t) {
                    if (!e) throw Error(A);
                    var o = null != t ? t : this.options.slide;
                    return (e.isFolder() || e.isEmptyFolder) && (new T(e, this).close(o, this.options.animationSpeed), this.saveState()), this.element;
                }),
                (t.prototype.isDragging = function () {
                    return this.dndHandler.isDragging;
                }),
                (t.prototype.refreshHitAreas = function () {
                    return this.dndHandler.refresh(), this.element;
                }),
                (t.prototype.addNodeAfter = function (e, t) {
                    var o = t.addAfter(e);
                    return o && this._refreshElements(t.parent), o;
                }),
                (t.prototype.addNodeBefore = function (e, t) {
                    if (!t) throw Error(P + "existingNode");
                    var o = t.addBefore(e);
                    return o && this._refreshElements(t.parent), o;
                }),
                (t.prototype.addParentNode = function (e, t) {
                    if (!t) throw Error(P + "existingNode");
                    var o = t.addParent(e);
                    return o && this._refreshElements(o.parent), o;
                }),
                (t.prototype.removeNode = function (e) {
                    if (!e) throw Error(A);
                    if (!e.parent) throw Error("Node has no parent");
                    this.selectNodeHandler.removeFromSelection(e, !0);
                    var t = e.parent;
                    return e.remove(), this._refreshElements(t), this.element;
                }),
                (t.prototype.appendNode = function (e, t) {
                    var o = t || this.tree,
                        n = o.append(e);
                    return this._refreshElements(o), n;
                }),
                (t.prototype.prependNode = function (e, t) {
                    var o = null != t ? t : this.tree,
                        n = o.prepend(e);
                    return this._refreshElements(o), n;
                }),
                (t.prototype.updateNode = function (e, t) {
                    if (!e) throw Error(A);
                    var o = "object" == typeof t && t.id && t.id !== e.id;
                    o && this.tree.removeNodeFromIndex(e),
                        e.setData(t),
                        o && this.tree.addNodeToIndex(e),
                        "object" == typeof t && t.children && t.children instanceof Array && (e.removeChildren(), t.children.length && e.loadFromData(t.children));
                    var n = this.selectNodeHandler.isFocusOnTree(),
                        r = this.isSelectedNodeInSubtree(e);
                    return this._refreshElements(e), r && this.selectCurrentNode(n), this.element;
                }),
                (t.prototype.isSelectedNodeInSubtree = function (e) {
                    var t = this.getSelectedNode();
                    return !!t && (e === t || e.isParentOf(t));
                }),
                (t.prototype.moveNode = function (e, t, o) {
                    if (!e) throw Error(A);
                    if (!t) throw Error(P + "targetNode");
                    var n = h[o];
                    return void 0 !== n && (this.tree.moveNode(e, t, n), this._refreshElements(null)), this.element;
                }),
                (t.prototype.getStateFromStorage = function () {
                    return this.saveStateHandler.getStateFromStorage();
                }),
                (t.prototype.addToSelection = function (e, t) {
                    if (!e) throw Error(A);
                    return this.selectNodeHandler.addToSelection(e), this._getNodeElementForNode(e).select(void 0 === t || t), this.saveState(), this.element;
                }),
                (t.prototype.getSelectedNodes = function () {
                    return this.selectNodeHandler.getSelectedNodes();
                }),
                (t.prototype.isNodeSelected = function (e) {
                    if (!e) throw Error(A);
                    return this.selectNodeHandler.isNodeSelected(e);
                }),
                (t.prototype.removeFromSelection = function (e) {
                    if (!e) throw Error(A);
                    return this.selectNodeHandler.removeFromSelection(e), this._getNodeElementForNode(e).deselect(), this.saveState(), this.element;
                }),
                (t.prototype.scrollToNode = function (e) {
                    if (!e) throw Error(A);
                    var t = H(e.element).offset(),
                        o = t ? t.top : 0,
                        n = this.$el.offset(),
                        r = o - (n ? n.top : 0);
                    return this.scrollHandler.scrollToY(r), this.element;
                }),
                (t.prototype.getState = function () {
                    return this.saveStateHandler.getState();
                }),
                (t.prototype.setState = function (e) {
                    return this.saveStateHandler.setInitialState(e), this._refreshElements(null), this.element;
                }),
                (t.prototype.setOption = function (e, t) {
                    return (this.options[e] = t), this.element;
                }),
                (t.prototype.moveDown = function () {
                    var e = this.getSelectedNode();
                    return e && this.keyHandler.moveDown(e), this.element;
                }),
                (t.prototype.moveUp = function () {
                    var e = this.getSelectedNode();
                    return e && this.keyHandler.moveUp(e), this.element;
                }),
                (t.prototype.getVersion = function () {
                    return "1.5.2";
                }),
                (t.prototype._triggerEvent = function (e, t) {
                    var o = H.Event(e, t);
                    return this.element.trigger(o), o;
                }),
                (t.prototype._openNode = function (e, t, o) {
                    var n = this;
                    void 0 === t && (t = !0);
                    var r = function (e, t, o) {
                        new T(e, n).open(o, t, n.options.animationSpeed);
                    };
                    if (e.isFolder() || e.isEmptyFolder)
                        if (e.load_on_demand) this.loadFolderOnDemand(e, t, o);
                        else {
                            for (var i = e.parent; i; ) i.parent && r(i, !1, null), (i = i.parent);
                            r(e, t, o), this.saveState();
                        }
                }),
                (t.prototype._refreshElements = function (e) {
                    this.renderer.render(e), this._triggerEvent("tree.refresh");
                }),
                (t.prototype._getNodeElementForNode = function (e) {
                    return e.isFolder() ? new T(e, this) : new b(e, this);
                }),
                (t.prototype._getNodeElement = function (e) {
                    var t = this.getNode(e);
                    return t ? this._getNodeElementForNode(t) : null;
                }),
                (t.prototype._containsElement = function (e) {
                    var t = this.getNode(H(e));
                    return null != t && t.tree === this.tree;
                }),
                (t.prototype._getScrollLeft = function () {
                    return this.scrollHandler.getScrollLeft();
                }),
                (t.prototype.init = function () {
                    e.prototype.init.call(this),
                        (this.element = this.$el),
                        (this.mouseDelay = 300),
                        (this.isInitialized = !1),
                        (this.options.rtl = this.getRtlOption()),
                        null == this.options.closedIcon && (this.options.closedIcon = this.getDefaultClosedIcon()),
                        (this.renderer = new y(this)),
                        (this.dataLoader = new N(this)),
                        (this.saveStateHandler = new j(this)),
                        (this.selectNodeHandler = new W(this)),
                        (this.dndHandler = new f(this)),
                        (this.scrollHandler = new F(this)),
                        (this.keyHandler = new S(this)),
                        this.initData(),
                        this.element.on("click", this.handleClick),
                        this.element.on("dblclick", this.handleDblclick),
                        this.options.useContextMenu && this.element.on("contextmenu", this.handleContextmenu);
                }),
                (t.prototype.deinit = function () {
                    this.element.empty(), this.element.off(), this.keyHandler.deinit(), (this.tree = new p({}, !0)), e.prototype.deinit.call(this);
                }),
                (t.prototype.mouseCapture = function (e) {
                    return !!this.options.dragAndDrop && this.dndHandler.mouseCapture(e);
                }),
                (t.prototype.mouseStart = function (e) {
                    return !!this.options.dragAndDrop && this.dndHandler.mouseStart(e);
                }),
                (t.prototype.mouseDrag = function (e) {
                    if (this.options.dragAndDrop) {
                        var t = this.dndHandler.mouseDrag(e);
                        return this.scrollHandler.checkScrolling(), t;
                    }
                    return !1;
                }),
                (t.prototype.mouseStop = function (e) {
                    return !!this.options.dragAndDrop && this.dndHandler.mouseStop(e);
                }),
                (t.prototype.initData = function () {
                    this.options.data ? this.doLoadData(this.options.data, null) : this.getDataUrlInfo(null) ? this.doLoadDataFromUrl(null, null, null) : this.doLoadData([], null);
                }),
                (t.prototype.getDataUrlInfo = function (e) {
                    var t,
                        o = this,
                        n = this.options.dataUrl || this.element.data("url"),
                        r = function (t) {
                            if (null == e ? void 0 : e.id) {
                                var n = { node: e.id };
                                t.data = n;
                            } else {
                                var r = o.getNodeIdToBeSelected();
                                if (r) {
                                    n = { selected_node: r };
                                    t.data = n;
                                }
                            }
                        };
                    return "function" == typeof n ? n(e) : "string" == typeof n ? (r((t = { url: n })), t) : n && "object" == typeof n ? (r(n), n) : null;
                }),
                (t.prototype.getNodeIdToBeSelected = function () {
                    return this.options.saveState ? this.saveStateHandler.getNodeIdToBeSelected() : null;
                }),
                (t.prototype.initTree = function (e) {
                    var t = this,
                        o = function () {
                            t.isInitialized || ((t.isInitialized = !0), t._triggerEvent("tree.init"));
                        };
                    if (this.options.nodeClass) {
                        (this.tree = new this.options.nodeClass(null, !0, this.options.nodeClass)), this.selectNodeHandler.clear(), this.tree.loadFromData(e);
                        var n = this.setInitialState();
                        this._refreshElements(null), n ? this.setInitialStateOnDemand(o) : o();
                    }
                }),
                (t.prototype.setInitialState = function () {
                    var e = this,
                        t = (function () {
                            if (e.options.saveState) {
                                var t = e.saveStateHandler.getStateFromStorage();
                                return t ? [!0, e.saveStateHandler.setInitialState(t)] : [!1, !1];
                            }
                            return [!1, !1];
                        })(),
                        o = t[0],
                        n = t[1];
                    return (
                        o ||
                            (n = (function () {
                                if (!1 === e.options.autoOpen) return !1;
                                var t = e.getAutoOpenMaxLevel(),
                                    o = !1;
                                return (
                                    e.tree.iterate(function (e, n) {
                                        return e.load_on_demand ? ((o = !0), !1) : !!e.hasChildren() && ((e.is_open = !0), n !== t);
                                    }),
                                    o
                                );
                            })()),
                        n
                    );
                }),
                (t.prototype.setInitialStateOnDemand = function (e) {
                    var t,
                        o,
                        n,
                        r = this;
                    (function () {
                        if (r.options.saveState) {
                            var t = r.saveStateHandler.getStateFromStorage();
                            return !!t && (r.saveStateHandler.setInitialStateOnDemand(t, e), !0);
                        }
                        return !1;
                    })() ||
                        ((t = r.getAutoOpenMaxLevel()),
                        (o = 0),
                        (n = function () {
                            r.tree.iterate(function (e, i) {
                                return e.load_on_demand
                                    ? (e.is_loading ||
                                          (function (e) {
                                              (o += 1),
                                                  r._openNode(e, !1, function () {
                                                      (o -= 1), n();
                                                  });
                                          })(e),
                                      !1)
                                    : (r._openNode(e, !1, null), i !== t);
                            }),
                                0 === o && e();
                        })());
                }),
                (t.prototype.getAutoOpenMaxLevel = function () {
                    return !0 === this.options.autoOpen ? -1 : "number" == typeof this.options.autoOpen ? this.options.autoOpen : "string" == typeof this.options.autoOpen ? parseInt(this.options.autoOpen, 10) : 0;
                }),
                (t.prototype.getClickTarget = function (e) {
                    var t = H(e),
                        o = t.closest(".jqtree-toggler");
                    if (o.length) {
                        if ((n = this.getNode(o))) return { type: "button", node: n };
                    } else {
                        var n,
                            r = t.closest(".jqtree-element");
                        if (r.length) if ((n = this.getNode(r))) return { type: "label", node: n };
                    }
                    return null;
                }),
                (t.prototype.getNode = function (e) {
                    var t = e.closest("li.jqtree_common");
                    return 0 === t.length ? null : t.data("node");
                }),
                (t.prototype.saveState = function () {
                    this.options.saveState && this.saveStateHandler.saveState();
                }),
                (t.prototype.selectCurrentNode = function (e) {
                    var t = this.getSelectedNode();
                    if (t) {
                        var o = this._getNodeElementForNode(t);
                        o && o.select(e);
                    }
                }),
                (t.prototype.deselectCurrentNode = function () {
                    var e = this.getSelectedNode();
                    e && this.removeFromSelection(e);
                }),
                (t.prototype.getDefaultClosedIcon = function () {
                    return this.options.rtl ? "&#x25c0;" : "&#x25ba;";
                }),
                (t.prototype.getRtlOption = function () {
                    if (null != this.options.rtl) return this.options.rtl;
                    var e = this.element.data("rtl");
                    return null !== e && !1 !== e && void 0 !== e;
                }),
                (t.prototype.doSelectNode = function (e, t) {
                    var o = this,
                        n = function () {
                            o.options.saveState && o.saveStateHandler.saveState();
                        };
                    if (!e) return this.deselectCurrentNode(), void n();
                    var r = d(d({}, { mustSetFocus: !0, mustToggle: !0 }), t || {});
                    if (o.options.onCanSelectNode ? !0 === o.options.selectable && o.options.onCanSelectNode(e) : !0 === o.options.selectable) {
                        if (this.selectNodeHandler.isNodeSelected(e)) r.mustToggle && (this.deselectCurrentNode(), this._triggerEvent("tree.select", { node: null, previous_node: e }));
                        else {
                            var i = this.getSelectedNode() || null;
                            this.deselectCurrentNode(), this.addToSelection(e, r.mustSetFocus), this._triggerEvent("tree.select", { node: e, deselected_node: i }), (s = e.parent) && s.parent && !s.is_open && o.openNode(s, !1);
                        }
                        var s;
                        n();
                    }
                }),
                (t.prototype.doLoadData = function (e, t) {
                    e && (this._triggerEvent("tree.load_data", { tree_data: e }), t ? (this.deselectNodes(t), this.loadSubtree(e, t)) : this.initTree(e), this.isDragging() && this.dndHandler.refresh());
                }),
                (t.prototype.deselectNodes = function (e) {
                    for (var t = 0, o = this.selectNodeHandler.getSelectedNodesUnder(e); t < o.length; t++) {
                        var n = o[t];
                        this.selectNodeHandler.removeFromSelection(n);
                    }
                }),
                (t.prototype.loadSubtree = function (e, t) {
                    t.loadFromData(e), (t.load_on_demand = !1), (t.is_loading = !1), this._refreshElements(t);
                }),
                (t.prototype.doLoadDataFromUrl = function (e, t, o) {
                    var n = e || this.getDataUrlInfo(t);
                    this.dataLoader.loadFromUrl(n, t, o);
                }),
                (t.prototype.loadFolderOnDemand = function (e, t, o) {
                    var n = this;
                    void 0 === t && (t = !0),
                        (e.is_loading = !0),
                        this.doLoadDataFromUrl(null, e, function () {
                            n._openNode(e, t, o);
                        });
                }),
                (t.defaults = {
                    animationSpeed: "fast",
                    autoOpen: !1,
                    saveState: !1,
                    dragAndDrop: !1,
                    selectable: !0,
                    useContextMenu: !0,
                    onCanSelectNode: void 0,
                    onSetStateFromStorage: void 0,
                    onGetStateFromStorage: void 0,
                    onCreateLi: void 0,
                    onIsMoveHandle: void 0,
                    onCanMove: void 0,
                    onCanMoveTo: void 0,
                    onLoadFailed: void 0,
                    autoEscape: !0,
                    dataUrl: void 0,
                    closedIcon: void 0,
                    openedIcon: "&#x25bc;",
                    slide: !0,
                    nodeClass: p,
                    dataFilter: void 0,
                    keyboardSupport: !0,
                    openFolderDelay: 500,
                    rtl: void 0,
                    onDragMove: void 0,
                    onDragStop: void 0,
                    buttonLeft: !0,
                    onLoading: void 0,
                    showEmptyFolder: !1,
                    tabIndex: 0,
                }),
                t
            );
        })(C);
    return D.register(M, "tree"), (e.JqTreeWidget = M), Object.defineProperty(e, "__esModule", { value: !0 }), e;
})({}, jQuery);

//# sourceMappingURL=tree.jquery.js.map
