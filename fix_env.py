env_path = '/var/www/sarhanindicators/server/.env'
with open(env_path, 'r') as f:
    lines = f.readlines()
new_lines = []
for line in lines:
    if line.startswith('KASHIER_SECRET_KEY='):
        new_lines.append('KASHIER_SECRET_KEY=e2b7717e14a86661138c27ff552aa2a4$f9ef3475c184e02bd0c284ba7e4c87b6466a62da1cd46474860f67bdf2baed3839dcbd793feabdd9ebd6ee3184aca323\n')
    else:
        new_lines.append(line)
with open(env_path, 'w') as f:
    f.writelines(new_lines)
print('KASHIER_SECRET_KEY fixed successfully!')
