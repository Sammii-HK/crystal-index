from pony.orm import *
# from pony.orm import Required, Optional
# from app import db
db = Database()

class Crystal(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    color = Optional(str)
    chakras = Optional(str)

    # id = Required(str, unique=True)
# class CrystalSchema(Schema):
#     id = fields.Int(dump_only=True)
#     name = fields.Str(required=True)
    
    # apply the MANY of the 1:M relationship in the schema
    # favorites = fields.Nested('FavoriteSchema', many=True)
    # colours = fields.Nested('ColourSchema', many=True)
    # chakras = fields.Nested('ChakraSchema', many=True)
