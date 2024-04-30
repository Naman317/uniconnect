// Sidebar
const menuItems = document.querySelectorAll('.menu-item');



document.addEventListener("DOMContentLoaded", function () {
    // Function to handle liking a post
    function likePost(postId) {
        // Send a POST request to the server to like the post
        fetch(`/api/post/like/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to like the post");
            }
            // If successful, update the UI
            updateLikes(postId);
        })
        .catch((error) => {
            console.error("Error liking post:", error);
        });
    }

    // Function to handle disliking a post
    function dislikePost(postId) {
        // Send a POST request to the server to dislike the post
        fetch(`/api/post/dislike/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to dislike the post");
            }
            // If successful, update the UI
            updateLikes(postId);
        })
        .catch((error) => {
            console.error("Error disliking post:", error);
        });
    }

    // Function to update the like count in the UI
    function updateLikes(postId) {
        // Fetch the updated like count from the server
        fetch(`/api/post/${postId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch post details");
            }
            return response.json();
        })
        .then((postData) => {
            // Update the like count in the UI
            const likeCountElement = document.getElementById(`like-count-${postId}`);
            likeCountElement.textContent = postData.likes.length;
        })
        .catch((error) => {
            console.error("Error updating like count:", error);
        });
    }

    // Attach event listeners to like and dislike buttons
    document.querySelectorAll(".like-btn").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            const postId = event.target.dataset.postId;
            likePost(postId);
        });
    });

    document.querySelectorAll(".dislike-btn").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            const postId = event.target.dataset.postId;
            dislikePost(postId);
        });
    });
});
// JavaScript to handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.querySelector('.create-post');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        const content = document.getElementById('create-post-content').value;
        const image = document.getElementById('image-upload').files[0];

        // Perform client-side validation to check if an image file is selected
        if (!image) {
            console.error('Image file not provided');
            return; // Exit the function if no image file is selected
        }

        try {
            const formData = new FormData();
            formData.append('caption', content);
            formData.append('image', image);

            const response = await fetch('/api/post/create', {
                method: 'POST',
                body: formData,
                // Ensure correct form data formatting
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const responseData = await response.json();
            console.log('Post created successfully:', responseData);
            
            // Optionally, redirect to another page or update UI
        } catch (error) {
            console.error('Error creating post:', error.message);
            // Handle error: display error message, show alert, etc.
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    // Add click event listener to the logout button
    logoutButton.addEventListener('click', () => {
        // Perform logout actions here, such as clearing session data, redirecting to the logout endpoint, etc.
        // For example, you can redirect to a logout endpoint:
        window.location.href = '/index.html';
    });
});



// Messages 
const messageNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');   
const messageSearch = document.querySelector('#message-search');

//Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');


// ============== SIDEBAR ============== 

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications') {
            document.querySelector('.notifications-popup').
            style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').
            style.display = 'none';
        }
    })
})

// ============== MESSAGES ============== 

//Searches messages
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1) {
            user.style.display = 'flex'; 
        } else {
            user.style.display = 'none';
        }
    })
}

//Search for messages
messageSearch.addEventListener('keyup', searchMessage);

//Highlight messages card when messages menu item is clicked
messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// ============== THEME / DISPLAY CUSTOMIZATION ============== 

// Opens Modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// Closes Modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);


// ============== FONT SIZE ============== 

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => { 
   size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')) { 
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if(size.classList.contains('font-size-2')) { 
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if(size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if(size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if(size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
   })
})

// Remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// Change color primary
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass(); 

        if(color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if(color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if(color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if(color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if(color.classList.contains('color-5')) {
            primaryHue = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customized changes from local storage
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});