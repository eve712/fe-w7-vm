import { _ } from '../../util/util.js';
import Observable from '../../util/Observable.js';

export default class ProductContainerModel extends Observable{
    constructor() {
        super();
        this.menuInfo;
    }
    setMenuInfo(json) {
        this.menuInfo = json;
    }
    notifySelectedItem(idx) {
        if(this.menuInfo.list[idx].stock == 0) return;
        this.reduceSum(idx);
        this.printSelectedLog(idx);
        this.reduceStock(idx);
    }
    // progressScreenView에 보냄 - 투입금액 줄이기
    reduceSum(i) {
        this.dispatchEvent(
            new CustomEvent('reduce-money-sum', {
                detail: { price: this.menuInfo.list[i].price }
            })
        );
    }
    // logView에 보냄 - 선택, 배출 로그 출력
    printSelectedLog(i) {
        this.dispatchEvent(
            new CustomEvent('print-selected', {
                detail: { name: this.menuInfo.list[i].name }
            })
        );
    }
    reduceStock(i) { 
        this.menuInfo.list[i].stock--;
    }
    // ProductView에 보냄 - 구매가능 아이템 하이라이트
    sendAvailableItems(moneySum) {
        const itemIdxArr = this.getAvailableItems(moneySum);
        this.dispatchEvent(
            new CustomEvent('render-available-items', {
                detail: { itemIdxArr: itemIdxArr }
            })
        );
    }
    getAvailableItems(moneySum) {
        let itemIdx = [];
        this.menuInfo.list.forEach((e, i) => {
            if(e.price <= moneySum) itemIdx.push(i)
        })
        return itemIdx;
    }
}