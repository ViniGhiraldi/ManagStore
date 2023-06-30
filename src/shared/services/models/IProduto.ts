export interface IProduto{
    id: number;
    nome: string;
    descricao: string;
    categoria: 'livros' | 'jogos';
    valor: number;
    promocao?: number;
    foto: string;
}