import '../style.scss';
import { _ } from '../../../util.js';

export default class LogListItemView {
  constructor({ text }) {
    this.$target;
    this.text;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.setText(this.text);
  }

  createEl() {
    return _.genEl('LI', {
      classNames: ['log-list__item'],
    });
  }

  setText(text) {
    this.$target.textContent = text;
  }
}