export function listRequest({ name = null, page = 1 } = {}) {
  return {
    type: '@students/LIST_REQUEST',
    payload: { name, page },
  }
}

export function listSuccess(students, page) {
  return {
    type: '@students/LIST_SUCCESS',
    payload: { students, page },
  }
}

export function listFailure() {
  return {
    type: '@students/LIST_FAILURE',
  }
}

export function removeRequest(id) {
  return {
    type: '@students/REMOVE_REQUEST',
    payload: { id },
  }
}

export function removeSuccess(id) {
  return {
    type: '@students/REMOVE_SUCCESS',
    payload: { id },
  }
}

export function removeFailure() {
  return {
    type: '@students/REMOVE_FAILURE',
  }
}

export function updateRequest(id, name, email, birthday, weight, height) {
  return {
    type: '@students/UPDATE_REQUEST',
    payload: { id, name, email, birthday, weight, height },
  }
}

export function updateSuccess(student) {
  return {
    type: '@students/UPDATE_SUCCESS',
    payload: { student },
  }
}

export function updateFailure() {
  return {
    type: '@students/UPDATE_FAILURE',
  }
}

export function createRequest(name, email, birthday, weight, height) {
  return {
    type: '@students/CREATE_REQUEST',
    payload: { name, email, birthday, weight, height },
  }
}

export function createSuccess(student) {
  return {
    type: '@students/CREATE_SUCCESS',
    payload: { student },
  }
}

export function createFailure() {
  return {
    type: '@students/CREATE_FAILURE',
  }
}
