import q from 'q';

export const resolvedPromise = (res) => {
    const defer = q.defer();
    defer.resolve(res);
    return defer.promise;
};

export const rejectedPromise = (res) => {
    const defer = q.defer();
    defer.reject(res);
    return defer.promise;
};

export const getMockedClient = () => ({
    get: (url) => {},
    post: (url, data) => {},
    put: (url, data) => {},
    delete: (url) => {}
});
