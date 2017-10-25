package controllers

import javax.inject._

import play.api.mvc._
import ticTacToe.{Board, MoveGenerator}
import ticTacToe.CellState._
import controllers.support.BoardState
import play.api.Logger

@Singleton
class Application @Inject() extends Controller {

  import controllers.support.LevelToAiTranslator._

  def index = Action {
    val messageAndBoard = moveImpl(aiFor(1), "AAAAAAAAA")
    Ok(views.html.index(messageAndBoard._1, messageAndBoard._2))
  }

  def newGame(level: Int) = Action {
    val messageAndBoard = moveImpl(aiFor(level), "AAAAAAAAA")
    Ok(views.html.index(messageAndBoard._1, messageAndBoard._2))
  }

  def move(level: Int, setup: String) = Action {
    val messageAndBoard = moveImpl(aiFor(level), setup)
    Ok(views.html.index(messageAndBoard._1, messageAndBoard._2))
  }

  def moveImpl(level: String, setup: String): (String, Board) = {
    val result = MoveGenerator.moveUsingAi(level, setup)

    val winnerOrNot = result._1
    val updatedBoard = result._2

    val message = winnerOrNot match {
      case None => ""
      case Some(winner) => winner match {
        case Clear => "Tie (Cat Game)"
        case X => "I Win!!!"
        case O => "You Win??  You must have cheated!!!"
      }
    }
    Logger.info(setup)
    if(!message.isEmpty) Logger.info(message)
    (message, updatedBoard)
  }

}