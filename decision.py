def preguntar_decision():
  decision = input("Ingresa una decisión: ")
  costo = float(input("Ingresa el costo de esta decisión: "))
  return decision, costo

def agregar_decision(costo_total, decisiones):
  decision, costo = preguntar_decision()
  costo_total += costo
  decisiones.append((decision, costo))
  return costo_total, decisiones

costo_total = 0
decisiones = []
agregando = True
while agregando:
  opcion = input("¿Quieres agregar una decisión? (s/n)")
  if opcion == "s":
    costo_total, decisiones = agregar_decision(costo_total, decisiones)
  else:
    agregando = False

print(f"El costo total de las decisiones es: {costo_total}")
for decision, costo in decisiones:
  print(f"{decision}: {costo}")