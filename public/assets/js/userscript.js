document.querySelector('.toggle-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    console.log('drawer')
    sidebar.classList.toggle('active'); // Toggle the active class
    sidebar.classList.toggle('deActive'); // Toggle the active class
});


// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', (event) => {
        // Toggle the clicked accordion item
        const content = header.nextElementSibling;
        const isActive = content.style.display === "block";

        // Close all accordion items
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.style.display = "none";
        });

        // If the clicked item was not active, open it
        if (!isActive) {
            content.style.display = "block";
        }

        event.stopPropagation();
    });
});


window.addEventListener('click', ()=>{
    // Close all accordion items
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.display = "none";
    });
})

// Get the button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
});

function openOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
}

function closeOverlay() {
    const overlays = document.getElementsByClassName('overlay');
    for (let i = 0; i < overlays.length; i++) {
        overlays[i].style.display = 'none';
    }
}

window.addEventListener('click', function(event) {
    // Check if the clicked element is the overlay (not the overlay content)
    const overlays = document.getElementsByClassName('overlay');
    for (let i = 0; i < overlays.length; i++) {
        if (event.target === overlays[i]) {
            overlays[i].style.display = 'none';
        }
    }
});

const formProfilePic = document.getElementById('form-profile-pic')

formProfilePic.addEventListener('submit', async (event)=>{
    event.preventDefault();
    //console.log('axios')
        
    const formData = new FormData(formProfilePic)

    try{
        const response = await axios.put('/user/edit-profile-pic', formData)
        
        alert(`${response.data.message}`)
    }catch(err){
        console.log(err.message)
    }  

})
