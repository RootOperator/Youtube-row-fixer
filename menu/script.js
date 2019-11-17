let video_amount_slider = document.getElementById('videoAmount');
let show_val = document.getElementById('video_val');

browser.storage.local.get().then(data => {
    if(data.value){
        video_amount_slider.value = data.value;
        show_val.innerHTML = data.value;
    }
});;


video_amount_slider.oninput = function () {
    show_val.innerHTML = this.value;

    browser.storage.local.set({
        "value": this.value
    });

    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(tabs => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, {
                value: this.value
            });
        }
    });
}