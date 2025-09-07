function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check if the URI ends with a trailing slash
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    }
    // Check if the URI doesn't have a file extension
    else if (!uri.includes('.')) {
        // Try to append /index.html for directory-style URLs
        request.uri = uri + '/index.html';
    }
    
    return request;
}