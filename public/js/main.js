// const { generateImage } = require("../../controllers/openaiController");

const onSubmit = (e) => {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    if (prompt === '') {
        alert('Please write something')
        return;
    }

    generateImageRequest(prompt, size)
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });
        if (!response.ok) {
            hideSpinner();
            throw new Error('That image could not be generated')
        }

        const data = await response.json()
        const imagesUrlArray = data.data
    console.log(imagesUrlArray)
        const imageContainer = document.querySelector('.image-container');
        imageContainer.innerHTML = '';

        imagesUrlArray.map(item => {
            const image = document.createElement('img');
            image.src = item;
            image.alt = 'A description of the image';
            image.style = 'width: 40%'
            imageContainer.appendChild(image);
        });
        

        hideSpinner()
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }

}
const showSpinner = () => {
    const spinner = document.querySelector('.spinner')
    spinner.classList.add('show')
}

const hideSpinner = () => {
    const spinner = document.querySelector('.spinner')
    spinner.classList.remove('show')
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);