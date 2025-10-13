function removeUrlAnchor(url: String) {
  return url.split('#')[0];
}

console.log(removeUrlAnchor("www.codewars.com#about"));