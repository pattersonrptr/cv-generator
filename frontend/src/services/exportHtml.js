/**
 * Gera um arquivo HTML completo com o conteúdo do currículo e faz download.
 * @param {string} htmlContent - innerHTML do elemento do currículo
 * @param {string} nome - nome do candidato (usado no nome do arquivo)
 */
export const exportToHtml = (htmlContent, nome = 'curriculo') => {
  const fileName = `curriculo-${nome.toLowerCase().replace(/\s+/g, '-')}.html`;

  const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Currículo - ${nome}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333; background: #fff; padding: 20px; }
    h1 { font-size: 1.8em; margin-bottom: 4px; }
    h2 { font-size: 1.1em; border-bottom: 1px solid #ccc; margin: 16px 0 8px; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
    h3 { font-size: 1em; margin-bottom: 2px; }
    p, li { line-height: 1.5; margin-bottom: 4px; }
    ul { padding-left: 20px; }
    section { margin-bottom: 16px; }
    .curriculo { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="curriculo">
    ${htmlContent}
  </div>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};
