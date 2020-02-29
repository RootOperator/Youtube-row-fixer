let video_rows = document.getElementsByClassName('ytd-two-column-browse-results-renderer');

let total_row;
let total_disappear;

function calculate_windows_on_row(row_witdh){
    check_remove();
    let screen_width = screen.width - 305;
    let video_width = screen_width / total_row;
    return Math.round(row_witdh / video_width);
}

function check_remove(){
    if(total_row >= total_disappear){
        remove_avatar_img('none');
    }  else {
        remove_avatar_img('');
    }
}

function remove_avatar_img(style){
    let avatar_img = document.getElementsByClassName('yt-simple-endpoint');
    for(let i = 0; i < avatar_img.length; i++){
        if(avatar_img[i].id === 'avatar-link'){
            avatar_img[i].style.display = style
        }
    }   
}

function set_videos_on_row(){
    for(var i = 0; i < video_rows.length; i++){
        if(video_rows[i].style.cssText.includes('--ytd-rich-grid-items-per-row')){
            let row = calculate_windows_on_row(video_rows[i].clientWidth);
            video_rows[i].style.cssText = `--ytd-rich-grid-items-per-row: ${row};--ytd-rich-grid-posts-per-row: 4; --ytd-rich-grid-movies-per-row: 9;`;
        };
    }
}

function row_value() {
    browser.storage.local.get().then(data => {
        if(data.video_value){
            total_row = parseInt(data.video_value);
            set_videos_on_row();
        }
        if(data.disappear_value){
            total_disappear = parseInt(data.disappear_value);
            check_remove();
        }
    });
}

browser.runtime.onMessage.addListener(request => {
    if(request.video_value){
        total_row = parseInt(request.video_value);
        set_videos_on_row();
    }
    if(request.disappear_value){
        total_disappear = parseInt(request.disappear_value);
        check_remove();
    }
});

row_value();

window.onload = setTimeout(check_remove, 5);

window.onresize = set_videos_on_row;

window.onscroll = check_remove;