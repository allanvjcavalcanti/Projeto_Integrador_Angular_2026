import { Component, computed, signal } from '@angular/core';

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

@Component({
  selector: 'app-gerenciador',
  templateUrl: './gerenciador.html',
  styleUrl: './gerenciador.css',
})
export class Gerenciador {
  readonly tamanhoMinimo = 3;

  novaTarefa = signal('');
  private proximoId = 3;

  tarefas = signal<Tarefa[]>([
    {
      id: 1,
      titulo: 'Estudar TypeScript',
      concluida: false,
    },
    {
      id: 2,
      titulo: 'Criar projeto Angular',
      concluida: true,
    },
  ]);

  pendentes = computed(() => this.tarefas().filter((t) => !t.concluida).length);

  concluidas = computed(() => this.tarefas().filter((t) => t.concluida).length);

  todasConcluidas = computed(() => this.tarefas().length > 0 && this.pendentes() === 0);

  textoValido = computed(() => this.novaTarefa().trim().length >= this.tamanhoMinimo);

  textoCurto = computed(() => {
    const tamanho = this.novaTarefa().trim().length;
    return tamanho > 0 && tamanho < this.tamanhoMinimo;
  });

  atualizarTexto(evento: Event) {
    const campo = evento.target as HTMLInputElement;
    this.novaTarefa.set(campo.value);
  }

  adicionar() {
    const texto = this.novaTarefa().trim();

    if (texto.length < this.tamanhoMinimo) return;

    const tarefa: Tarefa = {
      id: this.proximoId++,
      titulo: texto,
      concluida: false,
    };

    this.tarefas.update((lista) => [...lista, tarefa]);
    this.novaTarefa.set('');
  }

  alternar(id: number) {
    this.tarefas.update((lista) =>
      lista.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  excluir(id: number) {
    this.tarefas.update((lista) => lista.filter((tarefa) => tarefa.id !== id));
  }

  limparConcluidas() {
    this.tarefas.update((lista) => lista.filter((tarefa) => !tarefa.concluida));
  }

  apagarTodas() {
    this.tarefas.set([]);
  }
}
