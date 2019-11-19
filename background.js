function calculate_windows_on_row(row_witdh, total_videos){
    let screen_width = screen.width - 305;
    let video_width = screen_width / total_videos;
    if(video_width <= 220){
        remove_avatar_img('none');
    }  else {
        remove_avatar_img('');
    }
    return Math.round(row_witdh / video_width);
}

function remove_avatar_img(style){
    let avatar_img = document.getElementsByClassName('yt-simple-endpoint');
    for(let i = 0; i < avatar_img.length; i++){
        if(avatar_img[i].id === 'avatar-link'){
            avatar_img[i].style.display = style
        }
    }
}

function set_videos_on_row(total_videos){
    let video_rows = document.getElementsByClassName('ytd-two-column-browse-results-renderer');
    for(var i = 0; i < video_rows.length; i++){
        if(video_rows[i].style.cssText.includes('--ytd-rich-grid-items-per-row')){
            let row = calculate_windows_on_row(video_rows[i].clientWidth, total_videos);
            video_rows[i].style.cssText = `--ytd-rich-grid-items-per-row: ${row};--ytd-rich-grid-posts-per-row: 4; --ytd-rich-grid-movies-per-row: 9;`;
        };
    }
}

function row_value() {
    browser.storage.local.get().then(data => {
        if(data.video_value){
            set_videos_on_row(data.video_value);
        }
    });
}

row_value();

browser.runtime.onMessage.addListener(request => {
    if(request.video_value){
        set_videos_on_row(request.video_value);
    }
    if(request.disappear_value){
        // remove icons on value
    }
});

window.onresize = row_value;