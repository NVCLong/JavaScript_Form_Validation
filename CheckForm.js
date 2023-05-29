console.log("Check form")
let Vadilator=(options)=> {
    let selectorRules = {}
    let validate = (element, rule) => {
        let errorMessage
        let exactMessage = element.parentElement.querySelector('.form_message')
        // lay ra cac rule
        let rules = selectorRules[rule.selector]
        // lap qua tung rule va kiem tra
        // neu co loi thi dung viec kiem tra
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](element.value)
            if (errorMessage) break
        }
        if (errorMessage) {
            alert(errorMessage)
            exactMessage.innerText = errorMessage;
            element.parentElement.classList.add('invalid')
        } else {
            exactMessage.innerText = ''
            element.parentElement.classList.remove('invalid')
        }
        return !errorMessage

    }
    let formElement = document.querySelector(options.form)
    if (formElement) {
        // khi submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();
            let isFormValid=true;
            // thuc hien lap qua tung rule va validate
            options.rules.forEach(function (rule) {
                let element = formElement.querySelector(rule.selector)
                let isValid= validate(element, rule);

                if(!isValid){
                    isFormValid=false;
                }

            })
            if (isFormValid){
                if(typeof options.onsubmit==='function'){
                    let enableInputs=document.querySelectorAll('[name]:not([disabled])').values();
                    let formvalue= Array.from(enableInputs).reduce((values,index)=>{
                        values[index.name]=index.value
                            return values
                    },{})
                    options.onsubmit(formvalue)

                }
            }else console.log('Co loi')
        }


        // lap qua moi xu ly
        options.rules.forEach((rule) => {
            // selectorRules[rule.selector]=rule.test;
            //luu lai cac rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            let element = formElement.querySelector(rule.selector)
            console.log(document.getElementById("PassWord").value)
            if (element) {
                element.onblur = () => {
                    validate(element, rule)
                }
                element.oninput = () => {
                    let errorMessage = rule.test(element.value)
                    let exactMessage = element.parentElement.querySelector('.form_message')
                    exactMessage.innerText = ''
                    element.parentElement.classList.remove('invalid')
                }
            }
        })
        console.log(selectorRules)


    }
}


    Vadilator.isRequired = (selector) => {
        return {
            selector: selector,
            test: (value) => {
                return value ? undefined : " Vui long nhap thong tin"
            }
        }
    }

    Vadilator.isEmail = (selector) => {
        return {
            selector: selector,
            test: (value) => {
                let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/
                return regex.test(value) ? undefined : "Vui long nhap email"
            }
        }
    }


    Vadilator.isEnought = (selector) => {
        return {
            selector: selector,
            test: (value) => {
                let x = 6;
                if (value.length < x) {
                    return "Mat khau khong du manh"
                } else return undefined;
            }
        }
    }


    Vadilator.checkCorrect = (selector, checkValue) => {
        return {
            selector: selector,
            test: (value) => {
                return (value === checkValue()) ? undefined : 'Gia tri nhap vao khong chinh xac'
            }
        }
    }

