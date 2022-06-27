import './comoFunciona.css'; 

export default function(){
    return(
        <div className="container-sm">
            <h4>Bem vindo ao SISDEGO!</h4>
            O SISDEGO - Sistema online para descarte de grandes objetos, é uma iniciativa para unir coletores e munícipes e facilitar o processo de descarte de resíduos sólidos como móveis usados, entulho, componentes eletrônicos, etc, tudo gratuitamente!
            Atenção: por enquanto a ferramenta está disponível apenas para a cidade de <u>Apiaí.</u>

            <div className="mt-2">
            <strong>Para utilizar é simples:</strong>
            <ul className='list-unstyled'>
                <li className='corpo'>1. Faça seu cadastro</li>
                <li className='corpo'>2. Faça o Login</li>
                <li className='corpo'>3. Na guia 'Novas Solicitações' você pode adicionar uma solicitação, informando o melhor dia e horário para a coleta.</li>
                <li className='corpo'>4. Na guia 'Minhas Solicitações' você pode ver todas as solicitações que já fez, com o status indicando se ela está <u>aguardando</u> algum catador aceitar ou <u>em fila de coleta</u> de algum catador. Lá você também pode alterar ou excluir a solicitação, caso seja necessário.</li>
                <li className='corpo'>5. Aproveite e contribua com o Meio Ambiente!</li>
            </ul>
           
            </div>
        </div>
    )
}