// reference: https://www.w3schools.com/howto/howto_js_typewriter.asp
var i = 0;
var txt = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus odit consequuntur, dignissimos eveniet id dolores, quam nemo esse, ullam quidem placeat quia odio et eos sit vel. Quos architecto voluptas praesentium ad quia iure consequatur dolores porro labore, perspiciatis ab laboriosam laudantium? Quisquam provident tenetur molestias fuga? Maxime laudantium quia ipsa, itaque, rem quibusdam inventore sit a sint voluptatem, incidunt magni similique pariatur doloremque accusamus quo repudiandae eius totam sed voluptatum fugit. Molestiae blanditiis quaerat nobis minima iure eos quas quidem dolores possimus alias magni placeat atque enim quasi adipisci, tempore laboriosam aperiam dolor voluptatum repudiandae? Dolore amet quasi ullam consequatur praesentium dolorum est. Laboriosam sit perferendis commodi inventore quos ipsum labore eligendi corporis at distinctio provident beatae, neque expedita aliquam recusandae. Officia dolorum accusantium dolore temporibus suscipit maxime tempore blanditiis ipsa expedita! Alias rerum dignissimos inventore voluptates maxime consequuntur est quasi quaerat temporibus, doloribus quas dolorem dolor quidem quod molestiae delectus dicta odio molestias minus architecto assumenda sequi cumque. Illum, distinctio? Quasi sint, quam molestias blanditiis error tenetur consequuntur cupiditate odio sapiente ipsam quaerat, dolorum reprehenderit nostrum mollitia, quae ad maiores maxime?'
var speed = 1000 / document.getElementById("wps").value; /* The speed/duration of the effect in milliseconds */
var count = document.getElementById("count");
var typewriter = document.getElementById("typing");

function typeWriter() {
    speed = 1000 / document.getElementById("wps").value;
    count.innerHTML = document.getElementById("wps").value + " Characters Per Second:";
    if (i < txt.length) {
        typewriter.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    if (i == txt.length) {
        i = 0;
        typewriter.innerHTML = "";
        setTimeout(typeWriter, speed);
    }
}

typeWriter();