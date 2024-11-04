import plotly.express as px
import pandas as pd

def generar_grafico_promedio_estudiante(datos):
    df = pd.DataFrame(datos)
    df_grouped = df.groupby('periodo')['nota'].mean().reset_index()
    
    fig = px.line(df_grouped, x='periodo', y='nota', markers=True, title='Promedio del Estudiante por Periodo')

    grafico_html = fig.to_json()
    return grafico_html

def clasificar_nota(nota):
    return 'Aprobado' if nota >= 3.0 else 'Reprobado'

def generar_grafico_rendimiento_estudiantes (datos):
    # Convertir los datos a DataFrame
    df = pd.DataFrame(datos)
    
    # Clasificar las notas
    df['estado'] = df['nota'].apply(clasificar_nota)

    # Contar cuántos aprobados y reprobados hay por cada materia
    estado_por_materia = df.groupby(['nombreCurso', 'estado']).size().reset_index(name='cantidad')

    # Crear la gráfica de barras con Plotly
    fig = px.bar(estado_por_materia, x='nombreCurso', y='cantidad', color='estado', barmode='group',
                title='Número de Aprobados y Reprobados por Materia',
                labels={'cantidad': 'Número de Estudiantes', 'materia': 'Materia', 'estado': 'Estado'},
                color_discrete_map={'Aprobado': '#636EFA', 'Reprobado': '#EF553B'})
    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html

def generar_grafico_necesidades_especiales (datosCursos, datosEstudiantes):
    df_estudiantes = pd.DataFrame(datosEstudiantes)
    df_notas = pd.DataFrame(datosCursos)

    # Calcular promedio acumulado por cada estudiante
    promedios = df_notas.groupby('correoEstudiante')['nota'].mean().reset_index()
    promedios.columns = ['correo', 'promedio_acumulado']

    # Unir los datos de los estudiantes con sus promedios
    df_final = pd.merge(df_estudiantes, promedios, on='correo')

    # Generar gráfica de violines
    fig = px.violin(df_final, y='promedio_acumulado', x='necesidadesEspecialesEducacion',
                    title='Distribución de Promedios Acumulados por Necesidades Especiales',
                    labels={'promedio_acumulado': 'Promedio Acumulado', 'necesidadesEspecialesEducacion': 'Necesidades Especiales?'},
                    box=True) # Agregar caja a la gráfica de violín

    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html

def generar_grafico_estado_civil (datosCursos, datosEstudiantes):
    df_estudiantes = pd.DataFrame(datosEstudiantes)
    df_notas = pd.DataFrame(datosCursos)

    # Calcular promedio acumulado por cada estudiante
    promedios = df_notas.groupby('correoEstudiante')['nota'].mean().reset_index()
    promedios.columns = ['correo', 'promedio_acumulado']

    # Unir los datos de los estudiantes con sus promedios
    df_final = pd.merge(df_estudiantes, promedios, on='correo')

    # Generar gráfica de violines
    fig = px.violin(df_final, y='promedio_acumulado', x='estadoCivil',
                    title='Distribución de Promedios Acumulados por Estado Civil',
                    labels={'promedio_acumulado': 'Promedio Acumulado', 'estadoCivil': 'Estado Civil'},
                    box=True) # Agregar caja a la gráfica de violín

    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html

def generar_grafico_prestamo (datosCursos, datosEstudiantes):
    df_estudiantes = pd.DataFrame(datosEstudiantes)
    df_notas = pd.DataFrame(datosCursos)

    # Calcular promedio acumulado por cada estudiante
    promedios = df_notas.groupby('correoEstudiante')['nota'].mean().reset_index()
    promedios.columns = ['correo', 'promedio_acumulado']

    # Unir los datos de los estudiantes con sus promedios
    df_final = pd.merge(df_estudiantes, promedios, on='correo')

    # Generar gráfica de violines
    fig = px.violin(df_final, y='promedio_acumulado', x='prestamo',
                    title='Distribución de Promedios Acumulados por Prestamo',
                    labels={'promedio_acumulado': 'Promedio Acumulado', 'prestamo': 'Prestamo?'},
                    box=True) # Agregar caja a la gráfica de violín

    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html

def generar_grafico_beca (datosCursos, datosEstudiantes):
    df_estudiantes = pd.DataFrame(datosEstudiantes)
    df_notas = pd.DataFrame(datosCursos)

    # Calcular promedio acumulado por cada estudiante
    promedios = df_notas.groupby('correoEstudiante')['nota'].mean().reset_index()
    promedios.columns = ['correo', 'promedio_acumulado']

    # Unir los datos de los estudiantes con sus promedios
    df_final = pd.merge(df_estudiantes, promedios, on='correo')

    # Generar gráfica de violines
    fig = px.violin(df_final, y='promedio_acumulado', x='beca',
                    title='Distribución de Promedios Acumulados por Beca',
                    labels={'promedio_acumulado': 'Promedio Acumulado', 'beca': 'Beca?'},
                    box=True) # Agregar caja a la gráfica de violín

    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html

def generar_grafico_desplazado (datosCursos, datosEstudiantes):
    df_estudiantes = pd.DataFrame(datosEstudiantes)
    df_notas = pd.DataFrame(datosCursos)

    # Calcular promedio acumulado por cada estudiante
    promedios = df_notas.groupby('correoEstudiante')['nota'].mean().reset_index()
    promedios.columns = ['correo', 'promedio_acumulado']

    # Unir los datos de los estudiantes con sus promedios
    df_final = pd.merge(df_estudiantes, promedios, on='correo')

    # Generar gráfica de violines
    fig = px.violin(df_final, y='promedio_acumulado', x='desplazado',
                    title='Distribución de Promedios Acumulados por Desplazados',
                    labels={'promedio_acumulado': 'Promedio Acumulado', 'desplazado': 'Desplazado?'},
                    box=True) # Agregar caja a la gráfica de violín

    # Mostrar la gráfica
    grafico_html = fig.to_json()
    return grafico_html