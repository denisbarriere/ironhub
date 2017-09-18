var obj = {"urls": null}
try {
console.log(obj.urls.github);
} catch(e) {
console.log(e.message);
console.log(e.name);
}

