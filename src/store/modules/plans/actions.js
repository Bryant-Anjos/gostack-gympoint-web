export function listRequest(page = 1) {
  return {
    type: '@plans/LIST_REQUEST',
    payload: { page },
  }
}

export function listSuccess(plans, page) {
  return {
    type: '@plans/LIST_SUCCESS',
    payload: { plans, page },
  }
}

export function listFailure() {
  return {
    type: '@plans/LIST_FAILURE',
  }
}

export function removeRequest(id) {
  return {
    type: '@plans/REMOVE_REQUEST',
    payload: { id },
  }
}

export function removeSuccess(id) {
  return {
    type: '@plans/REMOVE_SUCCESS',
    payload: { id },
  }
}

export function removeFailure() {
  return {
    type: '@plans/REMOVE_FAILURE',
  }
}

export function updateRequest(id, title, duration, price) {
  return {
    type: '@plans/UPDATE_REQUEST',
    payload: { id, title, duration, price },
  }
}

export function updateSuccess(plan) {
  return {
    type: '@plans/UPDATE_SUCCESS',
    payload: { plan },
  }
}

export function updateFailure() {
  return {
    type: '@plans/UPDATE_FAILURE',
  }
}

export function createRequest(title, duration, price) {
  return {
    type: '@plans/CREATE_REQUEST',
    payload: { title, duration, price },
  }
}

export function createSuccess(plan) {
  return {
    type: '@plans/CREATE_SUCCESS',
    payload: { plan },
  }
}

export function createFailure() {
  return {
    type: '@plans/CREATE_FAILURE',
  }
}
