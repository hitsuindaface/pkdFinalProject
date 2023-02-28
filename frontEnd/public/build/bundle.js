
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/quiz.svelte generated by Svelte v3.55.1 */

    const file$1 = "src/quiz.svelte";

    // (38:0) {#if showModal}
    function create_if_block(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (!/*game_over*/ ctx[3]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(38:0) {#if showModal}",
    		ctx
    	});

    	return block;
    }

    // (53:4) {:else}
    function create_else_block(ctx) {
    	let div2;
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t2;
    	let t3;
    	let t4;
    	let div1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Game over!";
    			t1 = space();
    			p1 = element("p");
    			t2 = text("Your score was ");
    			t3 = text(/*totalScore*/ ctx[1]);
    			t4 = space();
    			div1 = element("div");
    			button = element("button");
    			button.textContent = "Exit to menu";
    			attr_dev(p0, "class", "svelte-htjx5i");
    			add_location(p0, file$1, 55, 16, 1799);
    			attr_dev(p1, "class", "svelte-htjx5i");
    			add_location(p1, file$1, 56, 16, 1833);
    			add_location(div0, file$1, 54, 12, 1777);
    			attr_dev(button, "class", "svelte-htjx5i");
    			add_location(button, file$1, 59, 16, 1936);
    			attr_dev(div1, "class", "Quiz svelte-htjx5i");
    			add_location(div1, file$1, 58, 12, 1899);
    			attr_dev(div2, "class", "backdrop svelte-htjx5i");
    			add_location(div2, file$1, 53, 8, 1740);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(p1, t2);
    			append_dev(p1, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", self(/*click_handler*/ ctx[6]), false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*totalScore*/ 2) set_data_dev(t3, /*totalScore*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(53:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (39:4) {#if !game_over}
    function create_if_block_1(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t0_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].question + "";
    	let t0;
    	let t1;
    	let button0;
    	let t2_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[0] + "";
    	let t2;
    	let t3;
    	let button1;
    	let t4_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[1] + "";
    	let t4;
    	let t5;
    	let button2;
    	let t6_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[2] + "";
    	let t6;
    	let t7;
    	let button3;
    	let t8_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[3] + "";
    	let t8;
    	let t9;
    	let div1;
    	let h2;
    	let t10;
    	let strong;
    	let t11;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			button0 = element("button");
    			t2 = text(t2_value);
    			t3 = space();
    			button1 = element("button");
    			t4 = text(t4_value);
    			t5 = space();
    			button2 = element("button");
    			t6 = text(t6_value);
    			t7 = space();
    			button3 = element("button");
    			t8 = text(t8_value);
    			t9 = space();
    			div1 = element("div");
    			h2 = element("h2");
    			t10 = text("Your score is: ");
    			strong = element("strong");
    			t11 = text(/*totalScore*/ ctx[1]);
    			add_location(h1, file$1, 41, 16, 922);
    			attr_dev(button0, "class", "svelte-htjx5i");
    			add_location(button0, file$1, 42, 16, 974);
    			attr_dev(button1, "class", "svelte-htjx5i");
    			add_location(button1, file$1, 43, 16, 1126);
    			attr_dev(button2, "class", "svelte-htjx5i");
    			add_location(button2, file$1, 44, 16, 1278);
    			attr_dev(button3, "class", "svelte-htjx5i");
    			add_location(button3, file$1, 45, 16, 1430);
    			attr_dev(div0, "class", "Quiz svelte-htjx5i");
    			add_location(div0, file$1, 40, 12, 885);
    			add_location(strong, file$1, 48, 35, 1638);
    			attr_dev(h2, "class", "svelte-htjx5i");
    			add_location(h2, file$1, 48, 16, 1619);
    			add_location(div1, file$1, 47, 12, 1597);
    			attr_dev(div2, "class", "backdrop svelte-htjx5i");
    			add_location(div2, file$1, 39, 8, 847);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);
    			append_dev(div0, button0);
    			append_dev(button0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, button1);
    			append_dev(button1, t4);
    			append_dev(div0, t5);
    			append_dev(div0, button2);
    			append_dev(button2, t6);
    			append_dev(div0, t7);
    			append_dev(div0, button3);
    			append_dev(button3, t8);
    			append_dev(div2, t9);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(h2, t10);
    			append_dev(h2, strong);
    			append_dev(strong, t11);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[8], false, false, false),
    					listen_dev(button2, "click", /*click_handler_3*/ ctx[9], false, false, false),
    					listen_dev(button3, "click", /*click_handler_4*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*current_q*/ 4 && t0_value !== (t0_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].question + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*current_q*/ 4 && t2_value !== (t2_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[0] + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*current_q*/ 4 && t4_value !== (t4_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[1] + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*current_q*/ 4 && t6_value !== (t6_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[2] + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*current_q*/ 4 && t8_value !== (t8_value = /*arrQ*/ ctx[4][/*current_q*/ ctx[2]].alternatives[3] + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*totalScore*/ 2) set_data_dev(t11, /*totalScore*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(39:4) {#if !game_over}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let if_block = /*showModal*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			if (if_block) if_block.c();
    			add_location(main, file$1, 36, 0, 795);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showModal*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function check(question, choice) {
    	return question.answer === choice;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Quiz', slots, []);
    	let { showModal = false } = $$props;
    	let totalScore = 0;
    	let currentScore = 100;
    	let current_q = 0;
    	let game_over = false;

    	const arrQ = [
    		{
    			i: 1,
    			question: "What is 1+1?",
    			answer: "2",
    			alternatives: ["4", "5", "2", "1"]
    		},
    		{
    			i: 2,
    			question: "What is 1+2?",
    			answer: "3",
    			alternatives: ["3", "4", "1", "2"]
    		}
    	];

    	function score_add(is_right) {
    		if (is_right) {
    			$$invalidate(1, totalScore = totalScore + currentScore);
    			currentScore = 100;

    			if (arrQ[current_q + 1] != undefined) {
    				$$invalidate(2, current_q = current_q + 1);
    			} else {
    				$$invalidate(3, game_over = true);
    			}
    		} else {
    			currentScore = currentScore - 25;
    		}
    	}

    	function toggleModal() {
    		$$invalidate(0, showModal = !showModal);
    	}

    	const writable_props = ['showModal'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Quiz> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const click_handler_1 = () => score_add(check(arrQ[current_q], arrQ[current_q].alternatives[0]));
    	const click_handler_2 = () => score_add(check(arrQ[current_q], arrQ[current_q].alternatives[1]));
    	const click_handler_3 = () => score_add(check(arrQ[current_q], arrQ[current_q].alternatives[2]));
    	const click_handler_4 = () => score_add(check(arrQ[current_q], arrQ[current_q].alternatives[3]));

    	$$self.$$set = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    	};

    	$$self.$capture_state = () => ({
    		showModal,
    		totalScore,
    		currentScore,
    		current_q,
    		game_over,
    		arrQ,
    		check,
    		score_add,
    		toggleModal
    	});

    	$$self.$inject_state = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('totalScore' in $$props) $$invalidate(1, totalScore = $$props.totalScore);
    		if ('currentScore' in $$props) currentScore = $$props.currentScore;
    		if ('current_q' in $$props) $$invalidate(2, current_q = $$props.current_q);
    		if ('game_over' in $$props) $$invalidate(3, game_over = $$props.game_over);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showModal,
    		totalScore,
    		current_q,
    		game_over,
    		arrQ,
    		score_add,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class Quiz extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { showModal: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quiz",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get showModal() {
    		throw new Error("<Quiz>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showModal(value) {
    		throw new Error("<Quiz>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.55.1 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let quiz;
    	let t0;
    	let main;
    	let p;
    	let t2;
    	let div;
    	let button0;
    	let t4;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	quiz = new Quiz({
    			props: { showModal: /*showModal*/ ctx[0] },
    			$$inline: true
    		});

    	quiz.$on("click", /*toggleModal*/ ctx[1]);

    	const block = {
    		c: function create() {
    			create_component(quiz.$$.fragment);
    			t0 = space();
    			main = element("main");
    			p = element("p");
    			p.textContent = "Welcome to quizzi!";
    			t2 = space();
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Start";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "Leader board";
    			attr_dev(p, "class", "svelte-1je3sm0");
    			add_location(p, file, 28, 1, 492);
    			add_location(button0, file, 29, 6, 524);
    			add_location(div, file, 29, 1, 519);
    			add_location(button1, file, 30, 1, 577);
    			attr_dev(main, "class", "svelte-1je3sm0");
    			add_location(main, file, 27, 0, 484);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(quiz, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, p);
    			append_dev(main, t2);
    			append_dev(main, div);
    			append_dev(div, button0);
    			append_dev(main, t4);
    			append_dev(main, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*toggleModal*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*toggleLeaderB*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const quiz_changes = {};
    			if (dirty & /*showModal*/ 1) quiz_changes.showModal = /*showModal*/ ctx[0];
    			quiz.$set(quiz_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(quiz.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(quiz.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(quiz, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let showModal = false;
    	let is_right = false;
    	let showLeaderB = false;

    	function handleClick(question, response) {
    		is_right = !is_right;
    	}

    	function toggleModal() {
    		$$invalidate(0, showModal = !showModal);
    	}

    	function toggleLeaderB() {
    		showLeaderB = !showLeaderB;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Quiz,
    		showModal,
    		is_right,
    		showLeaderB,
    		handleClick,
    		toggleModal,
    		toggleLeaderB
    	});

    	$$self.$inject_state = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('is_right' in $$props) is_right = $$props.is_right;
    		if ('showLeaderB' in $$props) showLeaderB = $$props.showLeaderB;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showModal, toggleModal, toggleLeaderB];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
