"use sttrict";

(function(){
    const main = document.querySelector('.main')
    const newCalc = document.querySelector('#new')
    const storage = {
        getData(key) {return JSON.parse(localStorage.getItem(key))},
        setData(key, value) {localStorage.setItem(key, JSON.stringify(value))}
    }

    newCalc.onclick = function(){
        main.innerHTML = `
        <div class="body">
            <div class="bodycontent">
                <label>Номінал:</label>
                <select class="money cupure vol">
                    <optgroup label="Купюри">
                        <option value="1000">1000</option>
                        <option value="500">500</option>
                        <option value="200">200</option>
                        <option value="100">100</option>
                        <option value="50">50</option>
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </optgroup>
                    <optgroup label="Монети">
                        <option value="10">10.00</option>
                        <option value="5">5.00</option>
                        <option value="2">2.00</option>
                        <option value="1">1.00</option>
                        <option value="0.5">0.50</option>
                        <option value="0.1">0.10</option>
                    </optgroup>
                </select>
            </div>
            <div class="bodycontent">
                <label>Кількість:</label>
                <input type="number" value="0" min="0" step="1" class="money vol"></input>
            </div>
            <div class="bodycontent">
                <button class="money add">Додати</button>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Номінал</th>
                    <th>Кількість</th>
                    <th colspan="2">Сума</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2">Результат</th>
                    <th id="res" colspan="2"></th>
                </tr>
            </tfoot>
        </table>
        <div class="bodycontent">
            <button class="clean money">Зтерти</button>
        </div>`
        
        const add = document.querySelector('.add')
        let dataNew = []
        
        if (storage.getData('dataNew')) {dataNew = storage.getData('dataNew')}    
        
        render()

        add.onclick = function() {
            const string = {
                id: function(){
                    let id = 0
                    if (dataNew.length > 0){id = dataNew[dataNew.length-1].id + 1}
                    return id
                }(),
                cupure: +document.querySelector('.cupure').value,
                volume: +document.querySelector('.vol').value
            }  
            dataNew.push(string)
            storage.setData('dataNew', dataNew);
            render()
        }

        function deleteRow(id) {
            const result = dataNew.filter(function(dataNew){
                return (dataNew.id !== id)
            })
            dataNew = result
            storage.setData('dataNew', result)
            render()
        }

        function createTr(row){
            const tr = document.createElement('tr')
            tr.innerHTML =`
                <td>${row.cupure} грн.</td>
                <td>${row.volume} шт.</td>
                <td width="120px">${row.cupure * row.volume}</td>
                <td><button class="delete">Видалити</button></td>`
            
            tr.querySelector('.delete').onclick = function() {
                deleteRow(row.id)
            }
            return tr
        }

        function render(){
            const tbody = document.querySelector('tbody')
            tbody.innerHTML = ''
            for (let i of dataNew) {
                const row = createTr(i)
                tbody.appendChild(row)
            }
            summa()
        }

        function summa(){
            let res = 0
            for (let i in dataNew) {
                let x = +dataNew[i].cupure * +dataNew[i].volume
                res += x
            }
            document.querySelector('#res').innerHTML = res
        }

        document.querySelector('.clean').onclick = function(){
            dataNew = [];
            storage.setData('dataNew', dataNew)
            render()
        }
    }

    const oldCalc = document.querySelector('#old')
    oldCalc.onclick = function(){
        main.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Купюри</th>
                    <th>Монети</th>
                </tr>
            </thead>
            <tbody>
                <tr>    
                    <td>
                        <table class="inject">
                            <thead>
                                <tr>
                                    <th width="120px">Номінал</th>
                                    <th>Кількість</th>
                                    <th>Сума</th>
                                </tr>
                            </thead>
                            <tbody class="cupure">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Сума</th>
                                    <th id="resCupure" colspan="2"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                    <td class='coin-parent'>
                        <table class="inject">
                            <thead>
                                <tr>
                                    <th width="120px">Номінал</th>
                                    <th>Кількість</th>
                                    <th>Сума</th>
                                </tr>
                            </thead>
                            <tbody class="coin">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Сума</th>
                                    <th id="resCoin" colspan="2"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </td>

                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>Результат</th>
                    <th id="res"></th>
                </tr>
            </tfoot>
        </table>
        <button class="clean">Зтерти</button>`

        let dataOld = []

        function createCupure() {
            dataOld = []
            const cupureList = [1000.00, 500.00, 200.00, 100.00, 50.00, 20.00, 10.00, 5.00, 2.00, 1.00]
            let cupure = []
            for (let i in cupureList) {
                const string = {
                    cupure: cupureList[i],
                    volume: 0
                }
                cupure.push(string)
            }
            dataOld.push(cupure)

            let coin = []
            const coinList = [10.00, 5.00, 2.00, 1.00, 0.50, 0.10]
            for (let i in coinList) {
                const string = {
                    cupure: coinList[i],
                    volume: 0
                }
                coin.push(string)
            }
            dataOld.push(coin)
            storage.setData('dataOld', dataOld);            
        }
        
        if (storage.getData('dataOld')) {dataOld = storage.getData('dataOld')} else {createCupure()}

        render()

        function render(){
            const tbodyCupure = document.querySelector('.cupure')
            tbodyCupure.innerHTML = ''
            for (let i of dataOld[0]) {
                const row = createTr(i)
                tbodyCupure.appendChild(row)
            }
            
            const tbodyCoin = document.querySelector('.coin')
            tbodyCoin.innerHTML = ''
            for (let i of dataOld[1]) {
                const row = createTr(i)
                tbodyCoin.appendChild(row)
            }
            summa()
        }

        function createTr(row){
            const tr = document.createElement('tr')
            tr.innerHTML =`
                <td align="right">${row.cupure} грн.</td>
                <td><input value='${row.volume}' type='number' min="0" step="1" class='inptable'></input> шт.</td>
                <td width="120px">${row.cupure * row.volume}</td>`
            
            tr.querySelector('input').onchange = function (){
                row.volume = +tr.querySelector('input').value

                storage.setData('dataOld', dataOld)
                render()
            }
            
            return tr
        }

        function summa() {
            let cupure = 0
            let coin = 0

            for (let i in dataOld[0]){
                cupure += dataOld[0][i].cupure * dataOld[0][i].volume
            }
            for (let i in dataOld[1]){
                coin += dataOld[1][i].cupure * dataOld[1][i].volume
            }
            document.querySelector('#resCupure').innerHTML = cupure
            document.querySelector('#resCoin').innerHTML = coin.toFixed(2)
            document.querySelector('#res').innerHTML = cupure + coin

        }

        document.querySelector('.clean').onclick = function(){
            dataOld = []
            createCupure()
            render()
        }

    }

    newCalc.onclick()
}) ()