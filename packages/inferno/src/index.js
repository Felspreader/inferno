import { warning } from 'inferno-helpers';
import {
	createVNode,
	cloneVNode
} from '../../../build/core/VNodes';
import { render, findDOMNode, createRenderer } from '../../../build/DOM/rendering';
import linkEvent from '../../../build/DOM/events/linkEvent';
import options from '../../../build/core/options';

if (process.env.NODE_ENV !== 'production') {
	const testFunc = function testFn() {};
	if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
		warning(('It looks like you\'re using a minified copy of the development build ' +
				'of Inferno. When deploying Inferno apps to production, make sure to use ' +
				'the production build which skips development warnings and is faster. ' +
				'See http://infernojs.org for more details.'
		));
	}
}

// This will be replaced by rollup
const version = 'VERSION';

// we duplicate it so it plays nicely with different module loading systems
export default {
	linkEvent,
	// core shapes
	createVNode,

	// cloning
	cloneVNode,

	// DOM
	render,
	findDOMNode,
	createRenderer,
	options,
	version
};

export {
	linkEvent,
	// core shapes
	createVNode,

	// cloning
	cloneVNode,

	// DOM
	render,
	findDOMNode,
	createRenderer,
	options,
	version
};
