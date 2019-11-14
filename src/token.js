const urlParams = new URLSearchParams(window.location.search);

export const token = urlParams.get('token');