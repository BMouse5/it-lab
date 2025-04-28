export default {
    id: 3,
    title: "3 тур",
    text: "Викторина + загадки",
    type: "questionAndRiddles",
    questions: [
        {
            id: 1,
            text: "Как называется флаг флота России?",
            variants: ["Гюйс", "Андреевский флаг", "Морской стяг", "Военно-морское знамя"],
            answer: "Андреевский флаг"
        },
        {
            id: 2,
            text: "Найдите Андреевский флаг и выделите его",
            variants: [
                { image: "/img/andreevsky.png" },
                { image: "/img/flag-2.png" },
                { image: "/img/flag-3.jpg" },
                { image: "/img/flag-4.png" }
            ],
            answer: "/img/andreevsky.png",
            descriptionsAfterTour: {
                id: 1,
                title: "Андреевский флаг",
                text: "Андреевский флаг является главным корабельным кормовым флагом Российского Флота. Он представляет собой белое полотнище, пересеченное по диагонали двумя синими полосами, которые образуют наклонный крест, который называется Андреевским. Этот крест и дал имя флагу.",
                image: "/img/andreevsky.png"
            }
        }
    ]
}