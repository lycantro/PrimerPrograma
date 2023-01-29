import PySimpleGUI as sg

buttn_size = (7,3)
PLAYER_ONE = "X"
PLAYER_TWO ="O"
current_player = PLAYER_ONE

deck=[0,0,0,
      0,0,0,
      0,0,0]

winner_plays =[[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
game_end = False
#primera linea funcional
layout = [[sg.Button("", key="-0-",size=buttn_size),
           sg.Button("", key="-1-",size=buttn_size),
           sg.Button("", key="-2-",size=buttn_size)],
#segunda linea funcional
          [sg.Button("", key="-3-",size=buttn_size),
           sg.Button("", key="-4-",size=buttn_size),
           sg.Button("", key="-5-",size=buttn_size)],
#tercera linea funcional
          [sg.Button("", key="-6-",size=buttn_size),
           sg.Button("", key="-7-",size=buttn_size),
           sg.Button("", key="-8-",size=buttn_size)],
          [sg.Button("Riniciar", key= "-reiniciar-",size=(10,1))],
          [sg.Text(game_end, key="-WINNER-")],
          [sg.Button("He terminado",key="-OK-")]]


window = sg.Window("triki",layout)

while True:
        event, value =window.read()
        if event == sg.WIN_CLOSED or event =="-OK-":
                break

        if window.Element(event).ButtonText == "" and  not  game_end:
            index = int(event.replace("-", ""))
            deck[index] = current_player
            window.Element(event).Update(text=current_player)

            for winner_play in winner_plays:
                if deck[winner_play[0]]== deck [winner_play[1]] == deck[winner_play[2]]!=0:
                    if deck[winner_play[0]] == PLAYER_ONE:
                        print("jugador uno ha ganado")
                    else:
                        print(" jugador 2 ha ganado")
                    game_end = True

            if 0 not in deck:
                print("juego terminado")
                game_end=True

        if current_player == PLAYER_ONE:
            current_player = PLAYER_TWO
        else:
            current_player =PLAYER_ONE

window.close()



