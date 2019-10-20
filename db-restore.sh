#!/bin/bash
# read -p "Enter filename: " filename
# cp ~/Downloads/$filename ./backup.lzo
lzop -cd ./backup.lzo | psql "postgresql://postgres@localhost:40000/postgres"
