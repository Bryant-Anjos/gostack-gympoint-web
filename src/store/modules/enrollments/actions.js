export function listRequest() {
  return {
    type: '@enrollments/LIST_REQUEST',
  }
}

export function listSuccess(enrollments) {
  return {
    type: '@enrollments/LIST_SUCCESS',
    payload: { enrollments },
  }
}

export function listFailure() {
  return {
    type: '@enrollments/LIST_FAILURE',
  }
}

export function removeRequest(id) {
  return {
    type: '@enrollments/REMOVE_REQUEST',
    payload: { id },
  }
}

export function removeSuccess(id) {
  return {
    type: '@enrollments/REMOVE_SUCCESS',
    payload: { id },
  }
}

export function removeFailure() {
  return {
    type: '@enrollments/REMOVE_FAILURE',
  }
}

export function updateRequest(id, plan_id, start_date) {
  return {
    type: '@enrollments/UPDATE_REQUEST',
    payload: { id, plan_id, start_date },
  }
}

export function updateSuccess(enrollment) {
  return {
    type: '@enrollments/UPDATE_SUCCESS',
    payload: { enrollment },
  }
}

export function updateFailure() {
  return {
    type: '@enrollments/UPDATE_FAILURE',
  }
}

export function createRequest(student_id, plan_id, start_date) {
  return {
    type: '@enrollments/CREATE_REQUEST',
    payload: { student_id, plan_id, start_date },
  }
}

export function createSuccess(enrollment) {
  return {
    type: '@enrollments/CREATE_SUCCESS',
    payload: { enrollment },
  }
}

export function createFailure() {
  return {
    type: '@enrollments/CREATE_FAILURE',
  }
}
