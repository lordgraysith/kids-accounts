#!/bin/bash
read -p "Enter filename: " filename
mv "$filename" ./backup.lzo
lzop -cd backup.lzo | psql "postgresql://postgres@localhost:40000/postgres"
