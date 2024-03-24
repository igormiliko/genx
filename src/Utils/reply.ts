const reply = {
    SERVER_ERROR: (error: any) => ({
        code: 500,
        message: 'Error at server',
        error: JSON.stringify(error)
    }),
    CREATE_SUCCESS: () => ({
        code: 201,
        message: 'Create entity with success'
    }),
    READ_SUCCESS: () => ({
        code: 200,
        message: 'Reading entity with success'
    }),
    LIST_SUCCESS: () => ({
        code: 200,
        message: 'List entities with success'
    }),
    UPDATE_SUCCESS: () => ({
        code: 200,
        message: 'Edit entity with success'
    }),
    DELETE_SUCCESS: () => ({
        code: 201,
        message: 'Entity deleted with success'
    }),
    BAD_REQUEST: (message?: string) => ({
        code: 400,
        message: message || 'Request malformed'
    }),
    NOT_FOUND: (message?: string) => ({
        code: 404,
        message: message || 'Sorry we can\'t found it'
    }),
    UNAVAILABLE_SERVICE: () => ({
        code: 503,
        message: 'This service is under maintenance. Please try again later.'
    })
}

export default reply