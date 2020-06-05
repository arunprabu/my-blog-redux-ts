import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { PostsActionTypes } from './types'
import { fetchError, fetchSuccess, fetchRequestById, fetchSuccessById, updateRequestById, updateSuccessById } from './actions'
import { callApi } from '../../utils/api';

const API_ENDPOINT = 'http://jsonplaceholder.typicode.com/posts'

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(PostsActionTypes.FETCH_REQUEST, handleFetch)
}

function* handleFetchById(action: ReturnType<typeof fetchRequestById>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', `${API_ENDPOINT}/${action.payload}` )

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccessById(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchById() {
  yield takeEvery(PostsActionTypes.FETCH_REQUEST_BY_ID, handleFetchById)
}

function* handleUpdateById(action: ReturnType<typeof updateRequestById>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'put', `${API_ENDPOINT}/${action.payload.id}` )

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(updateSuccessById(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchUpdateById() {
  yield takeEvery(PostsActionTypes.UPDATE_REQUEST_BY_ID, handleUpdateById)
}



// We can also use `fork()` here to split our saga into multiple watchers.
function* postsSaga() {
  yield all([
      fork(watchFetchRequest), 
      fork(watchFetchById),
      fork(watchUpdateById)
  ])
}

export default postsSaga;
