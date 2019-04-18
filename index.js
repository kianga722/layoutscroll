// Function to add elements
const addNode = () => {
  const node = document.createElement('div');
  node.innerHTML = `
    <section>
      SuperCool
    </section >`;
  document.body.appendChild(node);
};

// Fill up viewport enough to create scrollbar
while (document.body.clientHeight < window.innerHeight) {
  addNode();
}

// Check if scrolled to bottom
document.addEventListener('scroll', () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    addNode();
  }
});
