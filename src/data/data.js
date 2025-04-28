import questions from './questions'
import riddles from './riddles'
import tour3 from './tour3'
import tour4 from './tour4'
import tour5 from './tour5'
import tour6 from './tour6'
import tour7 from './tour7'
import tour8 from './tour8'

export default {
  tours: [questions, riddles, tour3, tour4, tour5, tour6, tour7, tour8],
  getTourById(id) {
    return this.tours.find(tour => tour.id === Number(id))
  },
  getQuestion(tourId, questionId) {
    const tour = this.getTourById(tourId)
    return tour?.questions.find(q => q.id === Number(questionId))
  },
  getNextTour(currentTourId) {
    const currentIndex = this.tours.findIndex(t => t.id === currentTourId)
    return this.tours[currentIndex + 1]
  }
}