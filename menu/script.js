let video_amount_slider = document.getElementById('videoAmount');
let disappear_icon_slider = document.getElementById('disappear_icon_slider'); 

let video_val = document.getElementById('video_val');
let disappear_icon_value = document.getElementById('disappear_value'); 


browser.storage.local.get().then(data => { // get local storage data and set element values accordingly
    if(data.video_value){
        video_amount_slider.value = data.video_value;
        video_val.innerHTML = data.video_value;
    }
    if (data.disappear_value){
        disappear_icon_slider.value = data.disappear_value;
        disappear_icon_value.innerHTML = data.disappear_value;
    }
});


function set_send_local_vars(variables){ // write to local storage and send to background.js
    browser.storage.local.set(variables);

    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(tabs => {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, variables);
        }
    });
}


function slider(e){
    switch(e.target.id){
        case "videoAmount":
            video_val.innerHTML = e.target.value;
            set_send_local_vars({"video_value": e.target.value});
            break;

        case "disappear_icon_slider":
            disappear_icon_value.innerHTML = e.target.value > 1 ? e.target.value : "all";
            set_send_local_vars({"disappear_value": e.target.value});
            break;
    }
}


video_amount_slider.oninput = slider;
disappear_icon_slider.oninput = slider;