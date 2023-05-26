const Autocomplete = {
  wrapInput() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI() {
    const listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    const overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents() {
    this.input.addEventListener('input', this.valueChanged.bind(this));
  },

  valueChanged() {
    const { value } = this.input;

    if (value.length > 0) {
      this.fetchMatches((value, matches) => {
        this.visible = true;
        this.matches = matches;
        this.draw();
      });
    } else {
      this.reset();
    }
  },

  fetchMatches(query, callback) {
    const request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  },

  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];

    this.wrapInput();
    this.createUI();
    this.bindEvents();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
});
