import Component, { doSomething } from './Component.js';

export class Tooltip extends Component {
  constructor(deactivateTooltipFn, tooltipText, hostElementId) {
    super(hostElementId);
    this.tooltipText = tooltipText;
    this.deactivateTooltip = deactivateTooltipFn;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.deactivateTooltip();
  };

  create = () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.tooltipText;
    tooltip.append(tooltipBody);
    //tooltip.textContent = this.tooltipText;
    // console.log(this.hostElement.getBoundingClientRect().left);
    // console.log(this.hostElement.offsetLeft);
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;

    const hostElementParent = this.hostElement.parentElement;

    let parentElementScrolling = hostElementParent.scrollTop;
    const parentElementHeight = hostElementParent.clientHeight;
    const parentElementTop = hostElementParent.offsetTop;
    const x = hostElPosLeft + 20;
    let y = hostElPosTop + hostElHeight - parentElementScrolling - 20;

    tooltip.style.position = 'absolute';
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';

    this.hostElement.parentElement.addEventListener('scroll', () => {
      parentElementScrolling = hostElementParent.scrollTop;
      y = hostElPosTop + hostElHeight - parentElementScrolling - 20;
      if (y > parentElementHeight + parentElementTop) {
        tooltip.style.display = 'none';
      } else {
        tooltip.style.display = 'block';
        tooltip.style.top = y + 'px';
      }
    });

    tooltip.addEventListener('click', this.closeTooltip);
    this.element = tooltip;
  };
}
