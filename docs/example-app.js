const SET_STATE = 'SET_STATE';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function makeSetState(reducer, hydrateActionType) {
	return function (state, action) {
		switch (action.type) {
		case hydrateActionType:
			return reducer(action.state, action);
		default:
			return reducer(state, action);
		}
	};
}

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const mapStateToProps = (state) => {
  return {
    value: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({
        type: 'INCREMENT'
      })
    },
    onDecrement: () => {
      dispatch({
        type: 'DECREMENT'
      })
    }
  };
};

const { connect } = ReactRedux;
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

/*
 * Let's create a store.
 */
const { createStore } = Redux;
const combinedWithSetState = makeSetState(counter, SET_STATE);
const store = createStore(combinedWithSetState);
// Wire in State-Buddy
	window.addEventListener('message', (event) => {
		switch (event.data.type) {
			case 'GET_STATE':
				event.target.postMessage({
					type: 'SEND_STATE',
					state: JSON.stringify(store.getState())
				}, '*');
				break;

			case 'SET_STATE':
				store.dispatch({
					type: SET_STATE,
					state: JSON.parse(event.data.state)
				});
				break;

			default:
				break;
		}
	});


ReactDOM.render(
  <CounterContainer store={store} />,
  document.getElementById('root')
);
